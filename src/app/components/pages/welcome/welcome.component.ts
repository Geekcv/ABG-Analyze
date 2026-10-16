
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
  import { Router } from '@angular/router';


@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  currentYear = new Date().getFullYear();


constructor(private router: Router) {}

redirectByRole(): void {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (token && role === 'ADMIN') {
    this.router.navigate(['/admin-dashboard'], {
      replaceUrl: true
    });
  } else if (token && role === 'USER') {
    this.router.navigate(['/user-dashboard'], {
      replaceUrl: true
    });
  } else {
    this.router.navigate(['/home']);
  }
}
}
