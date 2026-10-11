import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class ApicontrollerService {

  constructor(private apiService: ApiService) { }

  async loginuser(logindata: any, url: string = 'common/create-user') {
    const data = {
      "fn": "common_fn",
      "se": "lo_ap_us",
      "data": logindata
    };

    console.log(data)
    const resp: any = await this.apiService.postUrl(data, url);
    console.log(resp);
    return resp;
  }

    async Createuser(userdata: any, url: string = 'common/create-user') {
    const data = {
      "fn": "common_fn",
      "se": "res_user",
      "data": userdata
    };

    console.log(data)
    const resp: any = await this.apiService.postUrl(data, url);
    console.log(resp);
    return resp;
  }

  
async getAllUsers(url: string = 'common/') {
  const data = {
    fn: 'common_fn',
    se: 'fetch_user',
    data: {}
  };

  return await this.apiService.postUrl(data, url);
}


   
}


