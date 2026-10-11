
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  fullName = '';
  email = '';
  phone = '';
  password = '';
  confirmPassword = '';
  acceptTerms = false;

  showPassword = false;
  showConfirmPassword = false;
  submitted = false;
  currentYear = new Date().getFullYear();

  constructor(private router: Router) {}

  onSignup(): void {
    this.submitted = true;

    if (
      !this.fullName.trim() ||
      !this.email.trim() ||
      !this.phone.trim() ||
      !this.password ||
      !this.confirmPassword ||
      this.password !== this.confirmPassword ||
      !this.acceptTerms
    ) {
      return;
    }

    // Demo only: no account is stored and no server verifies the user.
    this.router.navigate(['/welcome']);
  }
}
