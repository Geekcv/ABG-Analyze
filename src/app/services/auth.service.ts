import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ApicontrollerService } from '../controller/apicontroller.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private http = inject(HttpClient);

  constructor(private apicontroller: ApicontrollerService) {}

  token: any = '';
  role :any = '';

async isUserStillActive(): Promise<boolean> {
  try {
    this.token = localStorage.getItem('token');
    if (!this.token) return false;

    let responsed = await this.apicontroller.Checkuserstatus(this.token);
    console.log("responsed", responsed);

    if (responsed && responsed.status === 0 && responsed.is_active === true) {
      return true;
    } else {
      return false; 
    }
  } catch (error) {
    console.error("Auth Check Error", error);
    return false; 
  }
}



  isValidToken() {
    // console.log('Auth Service')
    this.token = localStorage.getItem('token');
    // console.log(this.token)

    if (this.token !== '' && this.token !== undefined && this.token !== null) {
      // Extracting the payload from JWT Token and checking for the data to allowing user to access
      try {
        const payload = JSON.parse(atob(this.token?.split('.')[1]));
      // console.log('Decoded Payload:', payload);
        const expiration = payload.exp;
        this.role = payload.role;
        const currentTime = Math.floor(Date.now() / 1000);
        if (payload.row_id && currentTime < expiration) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        return false;
      }
    } else {
      return false;
    }
  }


getUserRole() {
  // Example: return localStorage.getItem('userRole'); 
  // or return this.user.role;

  return localStorage.getItem('role')
}

 
}
