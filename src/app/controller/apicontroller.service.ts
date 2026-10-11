import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class ApicontrollerService {

  constructor(private apiService: ApiService) { }

  async loginuser(logindata: any, url: string = 'auth/login') {
    const data = {
      "fn": "common_fn",
      "se": "lo_ap_us",
      "data": logindata
    };

    // console.log(data)
    const resp: any = await this.apiService.postUrl(data, url);
    // console.log(resp);
    return resp;
  }

    async Createuser(userdata: any, url: string = 'gateway') {
    const data = {
      "fn": "common_fn",
      "se": "Create_users",
      "data": userdata
    };

    // console.log(data)
    const resp: any = await this.apiService.postUrl(data, url);
    // console.log(resp);
    return resp;
  }

   async Fetchuser(url: string = 'gateway') {
    const data = {
      "fn": "common_fn",
      "se": "Fetch_users",
      "data": {
        "module":"user_module"
      }
    };

    // console.log(data)
    const resp: any = await this.apiService.postUrl(data, url);
    // console.log(resp);
    return resp;
  }

     async FetchallOffice(url: string = 'gateway') {
    const data = {
      "fn": "common_fn",
      "se": "fetch_sanghoffice",
      "data": {
        "module":"sanghoffice_module"
      }
    };

    // console.log(data)
    const resp: any = await this.apiService.postUrl(data, url);
    // console.log(resp);
    return resp;
  }

  

     async UpdateUserStatus(userid:any,newStatus:boolean, url: string = 'gateway') {
    const data = {
      "fn": "common_fn",
      "se": "active_defactive_operator",
      "data": {
        "userid":userid,
        "newStatus":newStatus,
        "module":"user_module"
      }
    };

    // console.log(data)
    const resp: any = await this.apiService.postUrl(data, url);
    // console.log(resp);
    return resp;
  }

       async DeleteUser(userid:any,url: string = 'gateway') {
    const data = {
      "fn": "common_fn",
      "se": "delete_operator",
      "data": {
         "userid":userid,
        "module":"user_module"
      }
    };

    // console.log(data)
    const resp: any = await this.apiService.postUrl(data, url);
    // console.log(resp);
    return resp;
  }

    async AssignedLocation(locationdata: any, url: string = 'gateway') {
    const data = {
      "fn": "common_fn",
      "se": "assign_loaction",
      "data": locationdata
    };

    // console.log(data)
    const resp: any = await this.apiService.postUrl(data, url);
    // console.log(resp);
    return resp;
  }

  async FetchuserLocations(url: string = 'gateway') {
    const data = {
      "fn": "common_fn",
      "se": "fetch_UserLocations",
      "data": {
        "module":"user_module"
      }
    };

    // console.log(data)
    const resp: any = await this.apiService.postUrl(data, url);
    // console.log(resp);
    return resp;
  }

  async createFamilydata(familydata: any, url: string = 'gateway') {
    const data = {
      "fn": "common_fn",
      "se": "create_family",
      "data": familydata
    };

    // console.log(data)
    const resp: any = await this.apiService.postUrl(data, url);
    // console.log(resp);
    return resp;
  }

  async fetchallfamilydata(city_id:any,url: string = 'gateway'){
    const data = {
      "fn": "common_fn",
      "se": "fetch_family",
      "data": {
               "city_id":city_id,
                "module":"family_module"
      }
    };

    // console.log(data)
    const resp: any = await this.apiService.postUrl(data, url);
    // console.log(resp);
    return resp;
  }

    async fetchallfamilydataByadmin(payload:any,url: string = 'gateway'){
    const data = {
      "fn": "common_fn",
      "se": "fetch_all_family_admin",
      "data": {
        "payload":payload ,
        "module":"family_module"
      }
    };

    // console.log(data)
    const resp: any = await this.apiService.postUrl(data, url);
    // console.log(resp);
    return resp;
  }

    async fetchalllocationsdata(url: string = 'gateway'){
    const data = {
      "fn": "common_fn",
      "se": "fetch_all_user_locations",
      "data": {
        "module":"user_module"
      }
    };

    // console.log(data)
    const resp: any = await this.apiService.postUrl(data, url);
    // console.log(resp);
    return resp;
  }


     async Checkuserstatus(token:any,url: string = 'gateway'){
    const data = {
      "fn": "common_fn",
      "se": "checkactive_inactive_user",
      "data": {
        "token":token,
        "module":"user_module"
      }
    };

    // console.log(data)
    const resp: any = await this.apiService.postUrl(data, url);
    // console.log(resp);
    return resp;
  }


    async fetchallusercountdata(tablename:any,url: string = 'gateway'){
    const data = {
      "fn": "common_fn",
      "se": "fetch_all_counts",
      "data": {
        "tablename":tablename,
         "module":"user_module"
      }
    };

    // console.log(data)
    const resp: any = await this.apiService.postUrl(data, url);
    // console.log(resp);
    return resp;
  }

     async fetchallInactiveusercountdata(tablename:any,url: string = 'gateway'){
    const data = {
      "fn": "common_fn",
      "se": "fetch_all_inactive_operator",
      "data": {
        "tablename":tablename,
         "module":"user_module"
      }
    };

    // console.log(data)
    const resp: any = await this.apiService.postUrl(data, url);
    // console.log(resp);
    return resp;
  }
     async fetchallfamilycountdata(tablename:any,url: string = 'gateway'){
    const data = {
      "fn": "common_fn",
      "se": "fetch_all_family_counts",
      "data": {
        "tablename":tablename,
         "module":"family_module"
      }
    };

    // console.log(data)
    const resp: any = await this.apiService.postUrl(data, url);
    // console.log(resp);
    return resp;
  }

  async fetchallfamilyMemberStatewisecountdata(url: string = 'gateway'){
    const data = {
      "fn": "common_fn",
      "se": "fetch_StateWise_Member_count",
      "data": {
         "module":"family_module"
      }
    };

    console.log(data)
    const resp: any = await this.apiService.postUrl(data, url);
    console.log(resp);
    return resp;
  }

   async fetchallfamilyMemberscountdata(url: string = 'gateway'){
    const data = {
      "fn": "common_fn",
      "se": "fetch_all_famaily_members_count",
      "data": {
         "module":"family_module"
      }
    };

    // console.log(data)
    const resp: any = await this.apiService.postUrl(data, url);
    // console.log(resp);
    return resp;
  }
  async deleteFamily(family_id:any,url: string = 'gateway') {
    const data = {
      "fn": "common_fn",
      "se": "delete_family",
      "data": {
         "family_id":family_id,
        "module":"family_module"
      }
    };

    console.log(data)
    const resp: any = await this.apiService.postUrl(data, url);
    console.log(resp);
    return resp;
  }
 
      async fetchallluserWithadmin(url: string = 'gateway'){
    const data = {
      "fn": "common_fn",
      "se": "fetch_all_user_withadmin",
      "data": {
        "module":"user_module"
      }
    };

    // console.log(data)
    const resp: any = await this.apiService.postUrl(data, url);
    // console.log(resp);
    return resp;
  }

  async findFamilyById(family_id:any,  url: string = 'gateway'){
const data = {
      "fn": "common_fn",
      "se": "fetch_family_data_byId",
      "data": {
        "payload":family_id,
        "module":"family_module"
      }
    };

    // console.log(data)
    const resp: any = await this.apiService.postUrl(data, url);
    // console.log(resp);
    return resp;
  }



  async CreateSanghOffice(sanghdata: any, url: string = 'gateway') {
    const data = {
      "fn": "common_fn",
      "se": "create_sanghoffice",
      "data": {
        "sanghdata":sanghdata,
        "module":"sanghoffice_module"
      }
    };

    // console.log(data)
    const resp: any = await this.apiService.postUrl(data, url);
    // console.log(resp);
    return resp;
  }

    async FetchSanghOffice(url: string = 'gateway') {
    const data = {
      "fn": "common_fn",
      "se": "fetch_sanghoffice",
      "data": {
        "module":"sanghoffice_module"
      }
    };

    // console.log(data)
    const resp: any = await this.apiService.postUrl(data, url);
    // console.log(resp);
    return resp;
  }

  async FetchallAera(payload:any,url: string = 'gateway') {
    const data = {
      "fn": "common_fn",
      "se": "all_sangh_area",
      "data": {
        "payload":payload,
        "module":"sanghoffice_module"
      }
    };

    // console.log(data)
    const resp: any = await this.apiService.postUrl(data, url);
    // console.log(resp);
    return resp;
  }
}


