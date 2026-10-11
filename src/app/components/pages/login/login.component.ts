
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  showPassword = false;
  submitted = false;

  currentYear = new Date().getFullYear();

  constructor(private router: Router) {}

  onLogin(): void {
    this.submitted = true;

    if (!this.email.trim() || !this.password) {
      return;
    }

    // UI only: backend authentication is not connected yet.
    console.log('Login form submitted', {
      email: this.email.trim()
    });

      this.router.navigate(['/welcome']);

  }
}
