import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public pdfdata: string = "";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'jwt-token'
    })
  };
  data = [
    'body=thi hbuh jnj jnj',
    'to= +8801982185584', 
    'from= +18472428244'
  ];

  masters = {};
  branchData = {};
 
   url="http://18.138.204.195:9000"; //Sabbir
  //url="http://localhost:3000";
  // url = "http://los.sitecare.org";
 // url="https://api.gotoaya.com"; //los bank infra
  constructor(private http: HttpClient) { }



  getMaster(masterName) {
    this.http.get(`${this.url}/api/master/${masterName}`).subscribe((response) => {
      this.masters[masterName] = response;
      return response;
    })
  }
  sms(credentials) {
    return this.http.post<any>(`${this.url}/apply/user/sms`, credentials || {}, this.httpOptions);

  }

  apply(credentials) {
    return this.http.post<any>(`${this.url}/apply/user/number`, credentials || {}, this.httpOptions);

  }
  login(credentials) {
    return this.http.post<any>(`${this.url}/api/user/authenticate`, credentials || {}, this.httpOptions);
  }

  changepassword(credentials) {
    return this.http.post<any>(`${this.url}/api/user/changepassword`, credentials || {}, this.httpOptions);
  }

  sendMail(credentials) {
    return this.http.post<any>(`${this.url}/api/user/sendmail`, credentials || {}, this.httpOptions);
  }

  sendMailToAdmin(credentials) {
    return this.http.post<any>(`${this.url}/api/user/sendMailToAdmin`, credentials || {}, this.httpOptions);
  }
  sendMailToBranch(credentials) {
    return this.http.post<any>(`${this.url}/api/user/sendMailToBranch`, credentials || {}, this.httpOptions);
  }


  getDealerstatus(id) {
    return this.http.get(`${this.url}/api/application/dealerStatus/${id}`);
  }
  send(toNumber: any, message: any)
  {
  	 var vv= this.http.post<any>(`https://api.twilio.com/2010-04-01/Accounts/ACedec8d6fee66c93735b2fd80d9279b50/Messages.json`, this.data , this.httpOptions);
  	 console.log(vv);
  	 return vv;
  }

  // public sms(toNumber: string, message: string): ng.IPromise {
  //       var authData = btoa(this.twilio.value);
     
  //       return this.$http({
  //           method: 'POST',
  //           url: 'https://api.twilio.com/2010-04-01/Accounts/ACedec8d6fee66c93735b2fd80d9279b50/Messages.json',
  //           data: $.param({Body: message, To: toNumber, From: '+18472428244'}),
  //           headers: {'Content-Type': 'application/x-www-form-urlencoded',
  //                   'Authorization': 'Basic ' + authData
  //           }
  //       });
  //   }


}
