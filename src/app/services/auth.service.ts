import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  token: any = '';
  role :any = '';

  isValidToken() {
    // console.log('Auth Service')
    this.token = localStorage.getItem('token');
    // console.log(this.token)

    if (this.token !== '' && this.token !== undefined && this.token !== null) {
      // Extracting the payload from JWT Token and checking for the data to allowing user to access
      try {
        const payload = JSON.parse(atob(this.token?.split('.')[1]));
        // console.log(payload);
        const expiration = payload.exp;
        const currentTime = Math.floor(Date.now() / 1000);
        this.role = payload.data.user_type;
        // console.log(payload.data.row_id && currentTime < expiration)
        if (payload.data.row_id && currentTime < expiration) {
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
 
}
