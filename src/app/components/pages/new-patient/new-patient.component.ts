
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApicontrollerService } from '../../../controller/apicontroller.service';

interface Patient {
  name: string;
  age: number | null;
  gender: string;
  ipdNo: string;
  bedNo: string;
  diagnosis: string;
  oldHistory: string;
}

@Component({
  selector: 'app-new-patient',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './new-patient.component.html',
  styleUrl: './new-patient.component.css'
})
export class NewPatientComponent {
  saving = false;
  message = '';
  errorMessage = '';

  patient: Patient = this.emptyPatient();

  
  constructor(
    private router: Router,
    private Apicontroller: ApicontrollerService,
  ) {}

  private emptyPatient(): Patient {
    return {
      name: '',
      age: null,
      gender: '',
      ipdNo: '',
      bedNo: '',
      diagnosis: '',
      oldHistory: ''
    };
  }

 async savePatient(form: NgForm) {
  this.message = '';
  this.errorMessage = '';

  if (form.invalid || this.saving) {
    form.control.markAllAsTouched();
    this.errorMessage = 'Please complete all required fields.';
    return;
  }

  this.saving = true;

  try {
    const payload = {
      name: this.patient.name.trim(),
      age: this.patient.age,
      gender: this.patient.gender,
      ipdNo: this.patient.ipdNo.trim(),
      bedNo: this.patient.bedNo.trim(),
      diagnosis: this.patient.diagnosis.trim(),
      oldHistory: this.patient.oldHistory.trim()
    };

    const resp = await this.Apicontroller.Addpatient(payload);

    if (resp?.status === 0) {
      this.message = resp.message || 'Patient saved successfully.';

      this.patient = this.emptyPatient();
      form.resetForm(this.patient);
    } else {
      this.errorMessage = resp?.message || 'Failed to save patient.';
    }
  } catch (error: any) {
    console.error('Add patient error:', error);
    this.errorMessage =
      error?.error?.message || error?.message || 'Unable to save patient.';
  } finally {
    this.saving = false;
  }
}

  resetForm(form: NgForm): void {
    this.patient = this.emptyPatient();
    this.message = '';
    this.errorMessage = '';
    form.resetForm(this.patient);
  }
}
