import { Routes } from '@angular/router';

import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { WelcomeComponent } from './components/pages/welcome/welcome.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { AdminDashboardComponent } from './components/pages/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './components/pages/user-dashboard/user-dashboard.component';
import { PatientBloodSugarComponent } from './components/pages/patient-blood-sugar/patient-blood-sugar.component';
import { OldPatientsComponent } from './components/pages/old-patients/old-patients.component';
import { NewPatientComponent } from './components/pages/new-patient/new-patient.component';
import { AbgCalculatorComponent } from './components/pages/abg-calculator/abg-calculator.component';
import { PatientSugarComponent } from './components/pages/patient-sugar/patient-sugar.component';
import { PatientSugarHistoryComponent } from './components/pages/patient-sugar-history/patient-sugar-history.component';
import { AdminProfileComponent } from './components/pages/admin-profile/admin-profile.component';

export const routes: Routes = [
  // { path: '', redirectTo: 'welcome', pathMatch: 'full' },

  {
    path: '',
    component: HomeComponent
  },

  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'signup', component: SignupComponent },

  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'user-dashboard', component: UserDashboardComponent },

  { path: 'patient-blood-sugar', component: PatientBloodSugarComponent },
  { path: 'new-patient', component: NewPatientComponent },
  { path: 'old-patients', component: OldPatientsComponent },

  { path: 'abg-calculator', component: AbgCalculatorComponent },
  { path: 'patient-current-sugar', component: PatientSugarComponent },
  { path: 'patient-sugar-history', component: PatientSugarHistoryComponent },
 {
    path: 'admin-profile',
    component: AdminProfileComponent
  },
  // Unknown URLs
  { path: '**', redirectTo: 'welcome' }
];