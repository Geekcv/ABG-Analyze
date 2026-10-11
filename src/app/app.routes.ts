import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { WelcomeComponent } from './components/pages/welcome/welcome.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { AdminDashboardComponent } from './components/pages/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './components/pages/user-dashboard/user-dashboard.component';

export const routes: Routes = [


    {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
    { path: 'welcome', component: WelcomeComponent },
      { path: 'signup', component: SignupComponent },
       { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'user-dashboard', component: UserDashboardComponent },

  {
    path: '**',
    redirectTo: ''
  }

];
