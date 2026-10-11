
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApicontrollerService } from '../../../controller/apicontroller.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
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

  // Top notification
  message = '';
  messageType: 'success' | 'error' = 'success';
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

  async onSignup() {
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
      this.showMessage(
        this.password !== this.confirmPassword
          ? 'Passwords do not match.'
          : 'Please fill all required fields and accept the terms.',
        'error'
      );
      return;
    }

    this.isLoading = true;

    try {
      const data = {
        name: this.fullName.trim(),
        email: this.email.trim(),
        phone: this.phone.trim(),
        password: this.password,
        role: 'USER',
      };

      const resp = await this.Apicontroller.Createuser(data);
      console.log('Signup response:', resp);

      if (resp?.status === 0) {
        this.showMessage(
          resp.msg || 'Registration successful!',
          'success'
        );

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      } else {
        this.showMessage(
          resp?.msg || 'Registration failed. Please try again.',
          'error'
        );
      }
    } catch (error: any) {
      console.error('Signup error:', error);

      this.showMessage(
        error?.response?.data?.msg ||
        error?.message ||
        'Something went wrong. Please try again.',
        'error'
      );
    } finally {
      this.isLoading = false;
    }
  }
}
