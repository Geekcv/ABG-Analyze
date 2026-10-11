
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  adminName = localStorage.getItem('name') || 'Admin';

  stats = [
    { title: 'Total Users', value: 0, icon: '👥' },
    { title: 'Active Users', value: 0, icon: '✅' },
    { title: 'ABG Analyses', value: 0, icon: '🩺' }
  ];


  constructor(private router: Router) {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (token && role === 'ADMIN') {
    this.router.navigate(['/admin-dashboard']);
  } else if (token && role === 'USER') {
    this.router.navigate(['/user-dashboard']);
  }
}
  


  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    this.router.navigate(['/login']);
  }
}
