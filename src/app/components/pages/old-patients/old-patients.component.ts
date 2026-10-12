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
  admitted_at?: string;
  discharged_at?: string | null;
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
  fromDate = '';
  toDate = '';

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

      // Supports direct response and HTTP response wrapper.
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
      this.patients = [];
      this.errorMessage =
        'Unable to fetch patients. Please try again.';
    } finally {
      this.loading = false;
    }
  }

  get filteredPatients(): Patient[] {
    const query = this.searchText.trim().toLowerCase();

    const from = this.fromDate
      ? new Date(this.fromDate).getTime()
      : null;

    const to = this.toDate
      ? new Date(this.toDate).getTime()
      : null;

    return this.patients.filter(patient => {
      const matchesSearch =
        !query ||
        String(patient.id ?? '').toLowerCase().includes(query) ||
        (patient.row_id ?? '').toLowerCase().includes(query) ||
        (patient.name ?? '').toLowerCase().includes(query) ||
        (patient.ipd_no ?? '').toLowerCase().includes(query) ||
        (patient.bed_no ?? '').toLowerCase().includes(query);

      const admissionTime = patient.admitted_at
        ? new Date(patient.admitted_at).getTime()
        : NaN;

      const matchesFrom =
        from === null ||
        (!Number.isNaN(admissionTime) && admissionTime >= from);

      const matchesTo =
        to === null ||
        (!Number.isNaN(admissionTime) && admissionTime <= to);

      return matchesSearch && matchesFrom && matchesTo;
    });
  }

  clearFilters(): void {
    this.searchText = '';
    this.fromDate = '';
    this.toDate = '';
  }

  selectPatient(patient: Patient): void {
    this.router.navigate(['/patient-blood-sugar/analyze'], {
      queryParams: {
        patientId: patient.id
      }
    });
  }

  trackByPatientId(index: number, patient: Patient): number {
    return patient.id;
  }


showDeleteDialog = false;
patientToDelete: Patient | null = null;
deletingPatientId: number | null = null;

deletePatient(patient: Patient): void {
  if (this.deletingPatientId !== null) {
    return;
  }

  this.patientToDelete = patient;
  this.showDeleteDialog = true;
}

cancelDelete(): void {
  if (this.deletingPatientId !== null) {
    return;
  }

  this.showDeleteDialog = false;
  this.patientToDelete = null;
}

async confirmDelete(): Promise<void> {
  const patient = this.patientToDelete;

  if (!patient || this.deletingPatientId !== null) {
    return;
  }

  this.deletingPatientId = patient.id;
  this.errorMessage = '';

  try {
    const resp: any = await this.Apicontroller.Deletepatient({
      id: patient.id,
      row_id: patient.row_id
    });

    const response =
      resp?.data?.status !== undefined ? resp.data : resp;

    if (response?.status === 0) {
      this.patients = this.patients.filter(
        p => p.id !== patient.id
      );

      this.showDeleteDialog = false;
      this.patientToDelete = null;
    } else {
      this.errorMessage =
        response?.msg || 'Failed to delete patient.';

      this.showDeleteDialog = false;
      this.patientToDelete = null;
    }
  } catch (error) {
    console.error('Delete patient error:', error);

    this.errorMessage =
      'Unable to delete patient. Please try again.';

    this.showDeleteDialog = false;
    this.patientToDelete = null;
  } finally {
    this.deletingPatientId = null;
  }
}
}