import { config } from '../../../config';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
   constructor(private router: Router) {}

  private buildHeaders() {
    const token: string | null = localStorage.getItem('token');
    // Customize headers here if needed
    return {
      'Content-Type': 'application/json',

      "Authorization": "Bearer " + token
      // Add more headers as required
    };
  }

  async postUrl(data: any, url: string) {
    // Encoding Payload
    const payload = this.encodeReqData(data);
    // console.log(payload)

    // Making API Call
    const resp = await axios.post(`${config.apiBaseURL}/${url}`, { payload }, { headers: this.buildHeaders(), responseType: 'text' as 'json' });
    // console.log(resp)
    
    // Decoding Resp
    const decodedResp = this.decodeReqData(resp.data);
    // console.log("decodedResp",decodedResp);

          // Check if the user was deactivated or deleted 
      if (decodedResp && decodedResp.status === 1 && decodedResp.is_active === false) {
        console.warn("User is inactive. Logging out...");
        this.forceLogout();
        return decodedResp; // Return to stop 
      }

    // Returning Resp
    return decodedResp
  }

    private forceLogout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  
  // Encode Data
  encodeReqData(data: any) {
    return btoa(encodeURIComponent(JSON.stringify(data)));
  }

  // Decode Data
  decodeReqData(data: any) {
    return JSON.parse(decodeURIComponent((atob(data))));
  }
}