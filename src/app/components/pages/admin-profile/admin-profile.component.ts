import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApicontrollerService } from '../../../controller/apicontroller.service';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent {
  profile = {
    name: '',
    email: '',
    role: 'ADMIN',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  message = '';

    loading: boolean = false;
  saving: boolean = false;


    constructor(
    private router: Router,
    private Apicontroller: ApicontrollerService
  ) {}



  ngOnInit(): void {
  this.loadProfile();
}

  async loadProfile(): Promise<void> {
  this.loading = true;
  this.message = '';

  try {
    const resp = await this.Apicontroller.getCurrentProfile();

    if (resp?.status === 0 && resp.data) {
      this.profile.name = resp.data.name || '';
      this.profile.email = resp.data.email || '';
      this.profile.role = resp.data.role || '';

      // Cancel button ke liye original values
      this.originalProfile = {
        name: this.profile.name,
        email: this.profile.email,
        role: this.profile.role,
      };
    } else {
      this.message = resp?.msg || 'Unable to fetch profile.';
    }
  } catch (error) {
    console.error('Get current profile error:', error);
    this.message = 'Unable to connect to the server.';
  } finally {
    this.loading = false;
  }
}


async saveProfile(): Promise<void> {
  this.message = '';

  const name = this.profile.name.trim();
  const email = this.profile.email.trim();
  const currentPassword = this.profile.currentPassword;
  const newPassword = this.profile.newPassword;
  const confirmPassword = this.profile.confirmPassword;

  if (!name || !email) {
    this.message = 'Name and email are required.';
    return;
  }

  // Password change is optional, but if started,
  // all three password fields are required.
  const changingPassword = !!(
    currentPassword || newPassword || confirmPassword
  );

  if (changingPassword) {
    if (!currentPassword || !newPassword || !confirmPassword) {
      this.message = 'Please fill all password fields.';
      return;
    }

    if (newPassword.length < 8) {
      this.message = 'New password must be at least 8 characters.';
      return;
    }

    if (newPassword !== confirmPassword) {
      this.message = 'New password and confirm password do not match.';
      return;
    }

    if (currentPassword === newPassword) {
      this.message = 'New password must differ from current password.';
      return;
    }
  }

  this.saving = true;

  try {
    const resp = await this.Apicontroller.updateCurrentProfile(
      name,
      email,
      changingPassword ? currentPassword : undefined,
      changingPassword ? newPassword : undefined
    );

    if (resp?.status === 0 && resp.data) {
      this.profile.name = resp.data.name || '';
      this.profile.email = resp.data.email || '';
      this.profile.role = resp.data.role || '';

      this.originalProfile = {
        name: this.profile.name,
        email: this.profile.email,
        role: this.profile.role,
      };

      this.profile.currentPassword = '';
      this.profile.newPassword = '';
      this.profile.confirmPassword = '';

      this.message =
        resp.msg ||
        (changingPassword
          ? 'Profile and password updated successfully.'
          : 'Profile updated successfully.');
    } else {
      this.message = resp?.msg || 'Unable to update profile.';
    }
  } catch (error) {
    console.error('Update profile error:', error);
    this.message = 'Unable to connect to the server.';
  } finally {
    this.saving = false;
  }
}


  originalProfile = {
  name: '',
  email: '',
  role: '',
};

cancelChanges(): void {
  this.profile.name = this.originalProfile.name;
  this.profile.email = this.originalProfile.email;
  this.profile.role = this.originalProfile.role;

  this.profile.currentPassword = '';
  this.profile.newPassword = '';
  this.profile.confirmPassword = '';

  this.message = '';
}

  goBack(): void {
  this.router.navigate(['/admin-dashboard']);
}
}