import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-patient-blood-sugar',
  imports: [RouterLink],
  templateUrl: './patient-blood-sugar.component.html',
  styleUrl: './patient-blood-sugar.component.css'
})
export class PatientBloodSugarComponent {


  constructor(private router: Router) {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
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
