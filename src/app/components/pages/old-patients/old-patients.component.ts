import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApicontrollerService } from '../../../controller/apicontroller.service';

interface Patient {
  id: number;
  row_id?: string;
  name: string;
  age: number;
  gender?: string;
  ipd_no?: string;
  bed_no?: string;
  diagnosis?: string;
  old_history?: string;
  cr_on?: string;
}

@Component({
  selector: 'app-old-patients',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './old-patients.component.html',
  styleUrl: './old-patients.component.css'
})
export class OldPatientsComponent implements OnInit {
  searchText = '';
  patients: Patient[] = [];
  loading = false;
  errorMessage = '';

  constructor(
    private router: Router,
    private Apicontroller: ApicontrollerService
  ) {}

  ngOnInit(): void {
    this.fetchPatients();
  }

  async fetchPatients(): Promise<void> {
    this.loading = true;
    this.errorMessage = '';

    try {
      const resp: any = await this.Apicontroller.getAllpatient();

      // Supports either a direct API response or an HTTP response wrapper.
      const response =
        resp?.data?.status !== undefined ? resp.data : resp;

      if (response?.status === 0) {
        this.patients = Array.isArray(response.data)
          ? response.data
          : [];
      } else {
        this.patients = [];
        this.errorMessage =
          response?.msg || 'Failed to fetch patients.';
      }
    } catch (error) {
      console.error('Fetch patients error:', error);
      this.errorMessage = 'Unable to fetch patients. Please try again.';
    } finally {
      this.loading = false;
    }
  }

  get filteredPatients(): Patient[] {
    const query = this.searchText.trim().toLowerCase();

    if (!query) {
      return this.patients;
    }

    return this.patients.filter(patient =>
      String(patient.id ?? '').toLowerCase().includes(query) ||
      (patient.row_id ?? '').toLowerCase().includes(query) ||
      (patient.name ?? '').toLowerCase().includes(query) ||
      (patient.ipd_no ?? '').toLowerCase().includes(query) ||
      (patient.bed_no ?? '').toLowerCase().includes(query)
    );
  }

  selectPatient(patient: Patient): void {
    // this.router.navigate(['/patient-blood-sugar/analyze'], {
    //   queryParams: { patientId: patient.id }
    // });
  }

  trackByPatientId(index: number, patient: Patient): number {
    return patient.id;
  }
}