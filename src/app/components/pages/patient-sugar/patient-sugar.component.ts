import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
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
  styleUrl: './patient-sugar.component.css'
})
export class PatientSugarComponent implements OnInit {
  patients: PatientSugar[] = [];
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private api: ApicontrollerService) {}

  ngOnInit(): void {
    this.fetchPatients();
  }

  async fetchPatients(): Promise<void> {
    this.loading = true;
    this.errorMessage = '';

    try {
      const resp: any = await this.api.getAllpatient();
      const response =
        resp?.data?.status !== undefined ? resp.data : resp;

      if (response?.status === 0) {
        this.patients = (Array.isArray(response.data) ? response.data : [])
          .map((p: any) => ({
            patient_id: p.id,
            bed_no: p.bed_no || '',
            name: p.name || '',
            age: p.age,
            gender: p.gender || '',
            sugar: null,
            treatments: '',
            saving: false
          }));
      } else {
        this.errorMessage = response?.msg || 'Failed to fetch patients.';
      }
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
      patient.sugar === undefined ||
      !Number.isFinite(Number(patient.sugar)) ||
      Number(patient.sugar) <= 0 ||
      Number(patient.sugar) > 2000
    ) {
      this.errorMessage =
        `Enter a valid sugar value for ${patient.name} (greater than 0 and up to 2000).`;
      return;
    }

    patient.saving = true;

    try {
      const resp: any = await this.api.AddPatientSugar({
        patient_id: patient.patient_id,
        sugar: Number(patient.sugar),
        treatments: patient.treatments.trim()
      });

      const response =
        resp?.data?.status !== undefined ? resp.data : resp;

      if (response?.status === 0) {
        this.successMessage = `Sugar record saved for ${patient.name}.`;
        patient.sugar = null;
        patient.treatments = '';
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
}