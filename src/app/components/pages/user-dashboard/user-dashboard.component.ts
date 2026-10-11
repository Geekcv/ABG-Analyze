
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {
  userName = localStorage.getItem('name') || 'User';

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
