import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { WelcomeComponent } from './components/pages/welcome/welcome.component';

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
  {
    path: '**',
    redirectTo: ''
  }


//       { path: '', redirectTo: 'login', pathMatch: 'full' },
//   { path: 'login', component: LoginComponent },
// //   { path: 'assignedlocation', component: AssignedLocation },
// //   { path: 'home', component: HomeComponent },

//   { 
//     path: 'home', 
//     canActivate: [authGuard],
//     canActivateChild: [authGuard],
//     component: HomeComponent,
//     children: [
//     //   { path: 'assignedlocation', component: AssignedLocation },
//       { path: 'user', component: UserComponents,data: { roles: ['Admin'] } },
//       { path: 'dashboard', component: Dashboard,data: { roles: ['Admin'] } },
//       { path: 'familyforms', component: FamilyComponents,data: {roles:['Admin','Operator']} },
//       { path: 'viewlocation', component: ViewlocationComponents,data: { roles: ['Operator'] } },
//       { path: 'assignedlocation', component: LocationassignedComponents,data: { roles: ['Admin'] } },
//       { path: 'viewfamily', component: ViewFamilydata,data: {roles:['Admin','Operator']} },
//       { path: 'showlocations', component: ShowAllUserLocations,data: { roles: ['Admin'] } },
//       { path: 'showstate', component: ShowallLocations,data: {roles:['Admin','Operator']} },
//       { path: 'pagenotfound', component: PageNotFoundComponent,data: {roles:['Admin','Operator']} },
//       {path:'edit-family',component: FamilyComponents,data: {roles:['Admin','Operator']} },
//       { path: 'filterfamily', component: Buttonbasedfilter,data: {roles:['Admin']} },
//       { path: 'sanghoffice', component: Santoffice,data: {roles:['Admin']} },
//       { path: '**', component: PageNotFoundComponent }






//     ]
//   },
//   { path: '**', component: PageNotFoundComponent }











];
