import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root',
})
export class ApicontrollerService {
  constructor(private apiService: ApiService) {}

  async loginuser(logindata: any, url: string = 'common/create-user') {
    const data = {
      fn: 'common_fn',
      se: 'lo_ap_us',
      data: logindata,
    };

    console.log(data);
    const resp: any = await this.apiService.postUrl(data, url);
    console.log(resp);
    return resp;
  }

  async Createuser(userdata: any, url: string = 'common/create-user') {
    const data = {
      fn: 'common_fn',
      se: 'res_user',
      data: userdata,
    };

    console.log(data);
    const resp: any = await this.apiService.postUrl(data, url);
    console.log(resp);
    return resp;
  }

  async getAllUsers(url: string = 'common/') {
    const data = {
      fn: 'common_fn',
      se: 'fetch_user',
      data: {},
    };

    return await this.apiService.postUrl(data, url);
  }

  async getAllpatient(url: string = 'common/') {
    const data = {
      fn: 'common_fn',
      se: 'fetch_pat',
      data: {},
    };

    return await this.apiService.postUrl(data, url);
  }

  async Addpatient(payload: any, url: string = 'common/') {
    const data = {
      fn: 'common_fn',
      se: 'cr_pat',
      data: payload,
    };

    return await this.apiService.postUrl(data, url);
  }

  async Deletepatient(data: any, url: string = 'common/') {
    const payload = {
      fn: 'common_fn',
      se: 'del_pat',
      data: data,
    };

    return await this.apiService.postUrl(payload, url);
  }

async AddPatientSugar(data: any, url: string = 'common/') {
  const payload = {
    fn: 'common_fn',
    se: 'add_patient_sugar',
    data
  };

  return await this.apiService.postUrl(payload, url);
}


async GetPatientSugarHistory(
  data: any,
  url: string = 'common/'
) {
  const payload = {
    fn: 'common_fn',
    se: 'fetch_patient_sugar_history',
    data
  };

  return await this.apiService.postUrl(payload, url);
}
}
