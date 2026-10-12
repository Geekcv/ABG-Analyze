import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

type Unit = 'mmHg' | 'kPa' | 'mmol/L' | 'mEq/L' | 'g/dL' | 'g/L';
type Field = 'ph' | 'paco2' | 'hco3' | 'sodium' | 'chloride' | 'albumin';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  ph: number | null = null;
  paco2: number | null = null;
  hco3: number | null = null;
  sodium: number | null = null;
  chloride: number | null = null;
  albumin: number | null = null;

  units: Record<Field, Unit> = {
    ph: 'mmHg',
    paco2: 'mmHg',
    hco3: 'mmol/L',
    sodium: 'mmol/L',
    chloride: 'mmol/L',
    albumin: 'g/dL'
  };

  chronicity: 'acute' | 'chronic' = 'acute';
  result = '';
  anionGap: number | null = null;
  correctedAnionGap: number | null = null;
  submitted = false;
  errors: Partial<Record<Field, string>> = {};

  currentYear = new Date().getFullYear();

  // Free usage settings
  readonly freeCalculationLimit = 2;
  freeCalculationsUsed = 0;
  showLoginPrompt = false;

  constructor(private router: Router) {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    // Keep your existing dashboard redirect behavior.
    if (token && role === 'ADMIN') {
      this.router.navigate(['/admin-dashboard'], {
        replaceUrl: true
      });
    } else if (token && role === 'USER') {
      this.router.navigate(['/user-dashboard'], {
        replaceUrl: true
      });
    }

    this.loadFreeCalculationCount();
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  get remainingFreeCalculations(): number {
    return Math.max(
      0,
      this.freeCalculationLimit - this.freeCalculationsUsed
    );
  }

  get canCalculate(): boolean {
    return this.isLoggedIn ||
      this.freeCalculationsUsed < this.freeCalculationLimit;
  }

  private loadFreeCalculationCount(): void {
    const savedCount = Number(
      localStorage.getItem('abg_free_calculations') || 0
    );

    this.freeCalculationsUsed =
      Number.isInteger(savedCount) && savedCount >= 0
        ? savedCount
        : 0;
  }

  private recordFreeCalculation(): void {
    if (this.isLoggedIn) {
      return;
    }

    this.freeCalculationsUsed++;

    localStorage.setItem(
      'abg_free_calculations',
      String(this.freeCalculationsUsed)
    );
  }

  get ranges(): Record<Field, string> {
    return {
      ph: '7.35 - 7.45',
      paco2: this.units.paco2 === 'kPa' ? '4.67 - 6.00' : '35 - 45',
      hco3: '22 - 26',
      sodium: '136 - 145',
      chloride: '98 - 106',
      albumin: this.units.albumin === 'g/L' ? '35 - 55' : '3.5 - 5.5'
    };
  }

  get values(): Record<Field, number | null> {
    return {
      ph: this.ph,
      paco2: this.paco2,
      hco3: this.hco3,
      sodium: this.sodium,
      chloride: this.chloride,
      albumin: this.albumin
    };
  }

  get referenceWarnings(): Partial<Record<Field, string>> {
    const warnings: Partial<Record<Field, string>> = {};

    const check = (
      field: Field,
      value: number | null,
      min: number,
      max: number
    ) => {
      if (
        value !== null &&
        Number.isFinite(value) &&
        value >= 0 &&
        (value < min || value > max)
      ) {
        warnings[field] =
          `Outside reference range (${this.ranges[field]})`;
      }
    };

    check('ph', this.ph, 7.35, 7.45);

    check(
      'paco2',
      this.paco2,
      this.units.paco2 === 'kPa' ? 4.67 : 35,
      this.units.paco2 === 'kPa' ? 6.00 : 45
    );

    check('hco3', this.hco3, 22, 26);
    check('sodium', this.sodium, 136, 145);
    check('chloride', this.chloride, 98, 106);

    check(
      'albumin',
      this.albumin,
      this.units.albumin === 'g/L' ? 35 : 3.5,
      this.units.albumin === 'g/L' ? 55 : 5.5
    );

    return warnings;
  }

  changeUnit(field: Field): void {
    const current = this.units[field];
    let next: Unit = current;

    if (field === 'paco2') {
      next = current === 'mmHg' ? 'kPa' : 'mmHg';

      if (this.paco2 !== null) {
        this.paco2 = Number(
          (next === 'kPa'
            ? this.paco2 / 7.50062
            : this.paco2 * 7.50062).toFixed(3)
        );
      }
    } else if (field === 'albumin') {
      next = current === 'g/dL' ? 'g/L' : 'g/dL';

      if (this.albumin !== null) {
        this.albumin = Number(
          (next === 'g/L'
            ? this.albumin * 10
            : this.albumin / 10).toFixed(2)
        );
      }
    } else if (field === 'hco3') {
      next = current === 'mmol/L' ? 'mEq/L' : 'mmol/L';
    } else if (field === 'sodium' || field === 'chloride') {
      next = current === 'mmol/L' ? 'mEq/L' : 'mmol/L';
    }

    this.units[field] = next;
    this.validateField(field);
  }

  calculate(): void {
    // Check the free limit before calculating.
    if (!this.canCalculate) {
      this.showLoginPrompt = true;
      return;
    }

    this.submitted = true;
    this.result = '';
    this.anionGap = null;
    this.correctedAnionGap = null;

    const requiredFields: Field[] = ['ph', 'paco2', 'hco3'];

    for (const field of requiredFields) {
      this.validateField(field);
    }

    if (requiredFields.some(field => !!this.errors[field])) {
      this.result = 'Please correct the required input fields.';
      return;
    }

    const ph = this.ph!;
    const paco2 = this.units.paco2 === 'kPa'
      ? this.paco2! * 7.50062
      : this.paco2!;
    const hco3 = this.hco3!;

    if (ph < 7.35) {
      if (paco2 > 45 && hco3 < 22) {
        this.result = 'Acidemia: possible mixed disorder.';
      } else if (paco2 > 45) {
        this.result = 'Acidemia: respiratory acidosis pattern.';
      } else if (hco3 < 22) {
        this.result = 'Acidemia: metabolic acidosis pattern.';
      } else {
        this.result = 'Acidemia: cause undetermined.';
      }
    } else if (ph > 7.45) {
      if (paco2 < 35 && hco3 > 26) {
        this.result = 'Alkalemia: possible mixed disorder.';
      } else if (paco2 < 35) {
        this.result = 'Alkalemia: respiratory alkalosis pattern.';
      } else if (hco3 > 26) {
        this.result = 'Alkalemia: metabolic alkalosis pattern.';
      } else {
        this.result = 'Alkalemia: cause undetermined.';
      }
    } else {
      this.result =
        'pH within reference interval. Further assessment is required.';
    }

    const optional: Field[] = ['sodium', 'chloride', 'albumin'];

    for (const field of optional) {
      const value = this.values[field];

      if (value !== null && (!Number.isFinite(value) || value <= 0)) {
        this.validateField(field);
        this.result = `Please correct ${field} input.`;
        return;
      }
    }

    if (this.sodium !== null && this.chloride !== null) {
      this.anionGap = Number(
        (this.sodium - this.chloride - hco3).toFixed(2)
      );

      if (this.albumin !== null) {
        const albumin = this.units.albumin === 'g/L'
          ? this.albumin / 10
          : this.albumin;

        this.correctedAnionGap = Number(
          (this.anionGap + 2.5 * (4 - albumin)).toFixed(2)
        );
      }
    }

    // Count only after the calculation reaches completion.
    this.recordFreeCalculation();

    // Display login prompt immediately after the second free use.
    if (!this.isLoggedIn && !this.canCalculate) {
      this.showLoginPrompt = true;
    }
  }

  validateField(field: Field): void {
    const value = this.values[field];
    let error = '';

    if (value === null || value === undefined) {
      if (field === 'ph' || field === 'paco2' || field === 'hco3') {
        error = 'This field is required.';
      }

      this.errors[field] = error;
      return;
    }

    if (!Number.isFinite(value)) {
      this.errors[field] = 'Please enter a valid number.';
      return;
    }

    if (field === 'ph' && (value < 0 || value > 14)) {
      error = 'pH must be between 0 and 14.';
    } else if (
      ['paco2', 'hco3', 'sodium', 'chloride', 'albumin'].includes(field) &&
      value <= 0
    ) {
      error = 'Value must be greater than zero.';
    }

    this.errors[field] = error;
  }
}