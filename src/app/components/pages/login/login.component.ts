import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApicontrollerService } from '../../../controller/apicontroller.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email = '';
  password = '';

  showPassword = false;
  submitted = false;
  currentYear = new Date().getFullYear();

  message = '';
  messageType: 'success' | 'error' = 'error';
  isLoading = false;

  private messageTimeout?: ReturnType<typeof setTimeout>;

  constructor(
    private router: Router,
    private Apicontroller: ApicontrollerService,
  ) {}

  showMessage(message: string, type: 'success' | 'error') {
    this.message = message;
    this.messageType = type;

    if (this.messageTimeout) {
      clearTimeout(this.messageTimeout);
    }

    this.messageTimeout = setTimeout(() => {
      this.message = '';
    }, 4000);
  }

  async onLogin(): Promise<void> {
    this.submitted = true;

    if (!this.email.trim() || !this.password) {
      this.showMessage('Please enter email and password.', 'error');
      return;
    }

    this.isLoading = true;

    try {
      const loginData = {
        email: this.email.trim(),
        password: this.password,
      };

      const resp = await this.Apicontroller.loginuser(loginData);

      console.log('Login response:', resp);

      if (resp?.status !== 0 || !resp?.data?.token) {
        this.showMessage(
          resp?.msg || 'Login failed. Please check your credentials.',
          'error',
        );
        return;
      }

      const token = resp.data.token;
      const role = String(resp.data.role || '').toUpperCase();

      // Save authentication details
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      this.showMessage('Login successful!', 'success');

      localStorage.setItem('name', resp.data.name || '');

      setTimeout(() => {
        if (role === 'ADMIN') {
          this.router.navigate(['/admin-dashboard']);
        } else if (role === 'USER') {
          this.router.navigate(['/user-dashboard']);
        } else {
          this.showMessage('Invalid user role.', 'error');
        }
      }, 700);
    } catch (error: any) {
      console.error('Login error:', error);

      this.showMessage(
        error?.response?.data?.msg ||
          'Unable to connect to the server. Please try again.',
        'error',
      );
    } finally {
      this.isLoading = false;
    }
  }
}
