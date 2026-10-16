import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApicontrollerService } from '../../../controller/apicontroller.service';

interface PatientSugar {
  patient_id: number;
  bed_no: string;
  name: string;
  age: number;
  gender: string;
  sugar: number | null;
  treatments: string;
  saving?: boolean;
}

@Component({
  selector: 'app-patient-sugar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './patient-sugar.component.html',
  styleUrl: './patient-sugar.component.css',
})
export class PatientSugarComponent implements OnInit {
  patients: PatientSugar[] = [];
  loading = false;
  errorMessage = '';
  successMessage = '';

  // Login ke time localStorage mein role save hona chahiye.
  role = (localStorage.getItem('role') || 'USER').toUpperCase();
  get isAdmin(): boolean {
    return this.role === 'ADMIN';
  }

  constructor(private api: ApicontrollerService,private router: Router) {

    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
  }

  ngOnInit(): void {
    this.fetchPatients();
  }

  async fetchPatients(): Promise<void> {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    try {
      // Admin: patient + latest sugar + treatment.
      // User: patients only, with empty sugar input.
      const resp: any = this.isAdmin
        ? await this.api.GetAllPatientCurrentSugar()
        : await this.api.getAllpatient();

      const response = resp?.data?.status !== undefined ? resp.data : resp;

      if (response?.status !== 0) {
        this.errorMessage = response?.msg || 'Failed to fetch patients.';
        return;
      }

      this.patients = (Array.isArray(response.data) ? response.data : []).map(
        (p: any) => ({
          patient_id: Number(p.patient_id ?? p.id),
          bed_no: p.bed_no || '',
          name: p.name || '',
          age: p.age,
          gender: p.gender || '',
          // Admin gets latest saved sugar; User always starts empty.
          sugar: this.isAdmin && p.sugar != null ? Number(p.sugar) : null,
          treatments: this.isAdmin ? p.treatments || '' : '',
          saving: false,
        }),
      );
    } catch (error) {
      console.error('Fetch patients error:', error);
      this.errorMessage = 'Unable to fetch patients.';
    } finally {
      this.loading = false;
    }
  }

  async submitSugar(patient: PatientSugar): Promise<void> {
    this.successMessage = '';
    this.errorMessage = '';

    if (
      patient.sugar === null ||
      !Number.isFinite(Number(patient.sugar)) ||
      Number(patient.sugar) <= 0 ||
      Number(patient.sugar) > 2000
    ) {
      this.errorMessage = `Enter a valid sugar value for ${patient.name} (greater than 0 and up to 2000).`;
      return;
    }

    patient.saving = true;

    try {
      const payload = {
        patient_id: patient.patient_id,
        sugar: Number(patient.sugar),
        treatments: this.isAdmin ? patient.treatments.trim() : '',
      };

      // Admin updates the latest record; User inserts a new record.
      const resp: any = this.isAdmin
        ? await this.api.UpdatePatientSugar(payload)
        : await this.api.AddPatientSugar(payload);

      const response = resp?.data?.status !== undefined ? resp.data : resp;

      if (response?.status === 0) {
        this.successMessage = this.isAdmin
          ? `Sugar and treatment updated for ${patient.name}.`
          : `Sugar record saved for ${patient.name}.`;

        // Admin keeps the saved values; User input becomes empty.
        if (!this.isAdmin) {
          patient.sugar = null;
          patient.treatments = '';
        } else {
          await this.fetchPatients();
        }
      } else {
        this.errorMessage =
          response?.msg || `Failed to save sugar for ${patient.name}.`;
      }
    } catch (error) {
      console.error('Save patient sugar error:', error);
      this.errorMessage = 'Unable to save sugar record.';
    } finally {
      patient.saving = false;
    }
  }


  
isMenuOpen = false;

toggleMenu(): void {
  this.isMenuOpen = !this.isMenuOpen;
}

closeMenu(): void {
  this.isMenuOpen = false;
}

logout(): void {
  this.closeMenu();

  // Replace this with your project's existing logout/auth service
  // if you have one.
  localStorage.removeItem('user');
  localStorage.removeItem('token');

  this.router.navigate(['/login']);
}

}
