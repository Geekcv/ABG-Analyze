import { config } from '../../../config';
import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
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
    // console.log(decodedResp);

    // Returning Resp
    return decodedResp
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