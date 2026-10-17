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
      data,
    };

    return await this.apiService.postUrl(payload, url);
  }

  async GetPatientSugarHistory(data: any, url: string = 'common/') {
    const payload = {
      fn: 'common_fn',
      se: 'fetch_patient_sugar_history',
      data,
    };

    return await this.apiService.postUrl(payload, url);
  }

  async GetAllPatientCurrentSugar(url: string = 'common/') {
    const payload = {
      fn: 'common_fn',
      se: 'fetch_patient_current_sugar',
      data: {},
    };

    return await this.apiService.postUrl(payload, url);
  }

  async UpdatePatientSugar(data: any, url: string = 'common/') {
    const payload = {
      fn: 'common_fn',
      se: 'update_patient_sugar',
      data,
    };

    return await this.apiService.postUrl(payload, url);
  }

  async manageUserStatus(
    payload: {
      row_id: string;
      action: 'activate' | 'deactivate' | 'delete' | 'restore';
    },
    url: string = 'common/',
  ) {
    const data = {
      fn: 'common_fn',
      se: 'manage_user_status',
      data: payload,
    };

    return await this.apiService.postUrl(data, url);
  }

  async getCurrentProfile(url: string = 'common/') {
  const data = {
    fn: 'common_fn',
    se: 'fe_prp',
    data: {},
  };

  return await this.apiService.postUrl(data, url);
}


async updateCurrentProfile(
  name: string,
  email: string,
  currentPassword?: string,
  newPassword?: string,
  url: string = 'common/'
) {
  const data = {
    fn: 'common_fn',
    se: 'up_prp',
    data: {
      name,
      email,
      ...(currentPassword && newPassword
        ? { currentPassword, newPassword }
        : {}),
    },
  };

  return await this.apiService.postUrl(data, url);
}

}
