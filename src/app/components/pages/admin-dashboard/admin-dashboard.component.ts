
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ApicontrollerService } from '../../../controller/apicontroller.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink,RouterLinkActive],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  adminName = localStorage.getItem('name') || 'Admin';

  users: any[] = [];
  loadingUsers = false;
  usersError = '';

  stats = [
    { title: 'Total Users', value: 0, icon: '👥' },
    { title: 'Active Users', value: 0, icon: '✅' },
    { title: 'ABG Analyses', value: 0, icon: '🩺' }
  ];

  constructor(
    private router: Router,
    private Apicontroller: ApicontrollerService
  ) {}

  currentYear = new Date().getFullYear();

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || role !== 'ADMIN') {
      this.router.navigate(['/login'], { replaceUrl: true });
      return;
    }

    this.loadUsers();
  }

  async loadUsers(): Promise<void> {
    this.loadingUsers = true;
    this.usersError = '';

    try {
      const resp = await this.Apicontroller.getAllUsers();

      if (resp?.status === 0) {
        this.users = Array.isArray(resp.data) ? resp.data : [];

        this.stats[0].value = this.users.length;
        this.stats[1].value = this.users.filter(
          user => user.is_active === true
        ).length;
      } else {
        this.usersError = resp?.msg || 'Unable to fetch users.';
      }
    } catch (error) {
      console.error('Get all users error:', error);
      this.usersError = 'Unable to connect to the server.';
    } finally {
      this.loadingUsers = false;
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');

    this.router.navigate(['/login']);
  }
}
