import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApicontrollerService } from '../../../controller/apicontroller.service';

interface SugarRecord {
  id: number;
  row_id: string;
  patient_id: number;
  sugar: number;
  treatments: string;
  cr_on: string;
  up_on: string;
}

@Component({
  selector: 'app-patient-sugar-history',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './patient-sugar-history.component.html',
  styleUrl: './patient-sugar-history.component.css'
})
export class PatientSugarHistoryComponent implements OnInit {
  patient: any = null;
  sugarRecords: SugarRecord[] = [];
  loading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApicontrollerService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const patientId = Number(params.get('patientId'));

      if (!Number.isInteger(patientId) || patientId <= 0) {
        this.errorMessage = 'Invalid patient ID.';
        return;
      }

      this.fetchSugarHistory(patientId);
    });
  }

  async fetchSugarHistory(patientId: number): Promise<void> {
    this.loading = true;
    this.errorMessage = '';

    try {
      const resp: any =
        await this.api.GetPatientSugarHistory({ patient_id: patientId });

      const response =
        resp?.data?.status !== undefined ? resp.data : resp;

      if (response?.status === 0) {
        this.patient = response.data?.patient || null;
        this.sugarRecords = Array.isArray(response.data?.sugarRecords)
          ? response.data.sugarRecords
          : [];

        if (!this.patient) {
          this.errorMessage = 'Patient not found.';
        }
      } else {
        this.errorMessage =
          response?.msg || 'Failed to fetch patient sugar history.';
      }
    } catch (error) {
      console.error('Fetch sugar history error:', error);
      this.errorMessage = 'Unable to load patient sugar history.';
    } finally {
      this.loading = false;
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