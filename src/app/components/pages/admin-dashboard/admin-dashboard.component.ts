import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Router,
  RouterLink,
  RouterLinkActive
} from '@angular/router';
import { ApicontrollerService } from '../../../controller/apicontroller.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {

  adminName = localStorage.getItem('name') || 'Admin';

  isSidebarOpen = false;

  totalUsers = 0;
  activeUsers = 0;
  totalReports = 0;

  users: any[] = [];

  loadingUsers = false;
  usersError = '';

  stats = [
    { title: 'Total Users', value: 0, icon: '👥' },
    { title: 'Active Users', value: 0, icon: '✅' },
    { title: 'ABG Analyses', value: 0, icon: '🩺' }
  ];

  currentYear = new Date().getFullYear();

  constructor(
    private router: Router,
    private Apicontroller: ApicontrollerService
  ) {}

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

        this.users = Array.isArray(resp.data)
          ? resp.data
          : [];

        // Calculate user counts from API data
        this.totalUsers = this.users.length;

        this.activeUsers = this.users.filter(
          user => user.is_active === true
        ).length;

        // Update statistics cards
        this.stats[0].value = this.totalUsers;
        this.stats[1].value = this.activeUsers;
        this.stats[2].value = this.totalReports;

      } else {
        this.users = [];
        this.totalUsers = 0;
        this.activeUsers = 0;

        this.stats[0].value = 0;
        this.stats[1].value = 0;

        this.usersError =
          resp?.msg || 'Unable to fetch users.';
      }

    } catch (error) {
      console.error('Get all users error:', error);

      this.usersError =
        'Unable to connect to the server.';

    } finally {
      this.loadingUsers = false;
    }
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar(): void {
    this.isSidebarOpen = false;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');

    this.router.navigate(['/login']);
  }
}