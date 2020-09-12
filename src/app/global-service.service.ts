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
  masters = {};
  branchData = {};
 
   url="http://18.138.204.195:3000"; //Mosaddek
  //url="http://localhost:3000";
  // url = "http://los.sitecare.org";
 // url="https://api.gotoaya.com"; //los bank infra
  constructor(private http: HttpClient) { }
  getApplication(queryStringObj) {
    let queryString = [];
    if ((queryStringObj.applicationNumber || "").trim() !== "") {
      queryString.push('number=' + queryStringObj.applicationNumber);
    }
    if ((queryStringObj.branch || "").trim() !== "") {
      queryString.push('branchCode=' + queryStringObj.branch);
    }
    if ((queryStringObj.applicationStatus || "").trim() !== "") {
      queryString.push('applicationStatus=' + 'Ops Verified');
    }
    if ((queryStringObj.status || "").trim() !== "") {
      queryString.push('status=' + queryStringObj.status);
    }
    if ((queryStringObj.guarantor || "").trim() !== "") {
      queryString.push('guarantor=' + queryStringObj.guarantor);
    }

    if ((queryStringObj.startPrice || "").trim() !== "") {
      queryString.push('startPrice=' + queryStringObj.startPrice);
    }
    if ((queryStringObj.endPrice || "").trim() !== "") {
      queryString.push('endPrice=' + queryStringObj.endPrice);
    }

    if ((queryStringObj.customerType || "").trim() !== "") {
      queryString.push('customerType=' + queryStringObj.customerType);
    }
    if ((queryStringObj.admin || "").trim() !== "") {
      queryString.push('admin=' + queryStringObj.admin);
    }
   
    if ((queryStringObj.startDate || "").trim() !== "") {
      queryString.push('startDate=' + queryStringObj.startDate);
    }

    if ((queryStringObj.endDate || "").trim() !== "") {
      queryString.push('endDate=' + queryStringObj.endDate);
    }
    if (queryStringObj.userid) {
      queryString.push('userid=' + queryStringObj.userid);
    }
    if (queryStringObj.dashboard) {
      queryString.push('dashboard=' + queryStringObj.dashboard);
    }
    if (queryStringObj.applicationType) {
      queryString.push('applicationtype=' + queryStringObj.applicationType);
    }
    return this.http.get(`${this.url}/api/application?${queryString.join('&')}`)
  }

  searchUser(queryStringObj) {
    let queryString = [];
    if ((queryStringObj.emailId || "").trim() !== "") {
      queryString.push('emailId=' + queryStringObj.emailId);
    }
    if ((queryStringObj.userTypeID || "").trim() !== "") {
      queryString.push('userTypeID=' + queryStringObj.userTypeID);
    }
    if ((queryStringObj.companyName || "").trim() !== "") {
      queryString.push('companyName=' + queryStringObj.companyName);
    }
    if ((queryStringObj.status || "").trim() !== "") {
      queryString.push('status=' + queryStringObj.status);
    }  
    if ((queryStringObj.startDate || "").trim() !== "") {
      queryString.push('startDate=' + queryStringObj.startDate);
    }

    if ((queryStringObj.endDate || "").trim() !== "") {
      queryString.push('endDate=' + queryStringObj.endDate);
    }

    return this.http.get(`${this.url}/api/user/searchUser?${queryString.join('&')}`)
  }
  searchDealer(queryStringObj) {
    let queryString = [];
    if ((queryStringObj.branchName || "").trim() !== "") {
      queryString.push('branchName=' + queryStringObj.branchName);
    }
    if ((queryStringObj.dealerId || "").trim() !== "") {
      queryString.push('dealerId=' + queryStringObj.dealerId);
    }
    if ((queryStringObj.dealerId || "").trim() !== "") {
      queryString.push('dealerId=' + queryStringObj.dealerId);
    }
    if ((queryStringObj.status || "").trim() !== "") {
      queryString.push('status=' + queryStringObj.status);
    }  
    if ((queryStringObj.startDate || "").trim() !== "") {
      queryString.push('startDate=' + queryStringObj.startDate);
    }

    if ((queryStringObj.endDate || "").trim() !== "") {
      queryString.push('endDate=' + queryStringObj.endDate);
    }
    if ((queryStringObj.name || "").trim() !== "") {
      queryString.push('name=' + queryStringObj.name);
    }

    return this.http.get(`${this.url}/api/user/searchDealer?${queryString.join('&')}`)
  }

  getreportdata(queryStringObj) {
    let queryString = [];
    if ((queryStringObj.applicationNumber || "").trim() !== "") {
      queryString.push('number=' + queryStringObj.applicationNumber);
    }
    if ((queryStringObj.startDate || "").trim() !== "") {
      queryString.push('startDate=' + queryStringObj.startDate);
    }

    if ((queryStringObj.endDate || "").trim() !== "") {
      queryString.push('endDate=' + queryStringObj.endDate);
    }
    if (queryStringObj.userid) {
      queryString.push('userid=' + queryStringObj.userid);
    }
    if(queryStringObj.applicationType){
      queryString.push('applicationType='+queryStringObj.applicationType);
    }
    return this.http.get(`${this.url}/api/application/getreportdata?${queryString.join('&')}`)
  }

  updateApplication(application) {
    return this.http.put<any>(`${this.url}/api/application/updateIndividualApplication`, application || {}, this.httpOptions);
  }
  updateDealer(application) {
    return this.http.put<any>(`${this.url}/api/user/updateDealer`, application || {}, this.httpOptions);
  }
  updateBranch(application) {
    return this.http.put<any>(`${this.url}/api/user/updateBranch`, application || {}, this.httpOptions);
  }
  updateUserType(application) {
    return this.http.put<any>(`${this.url}/api/user/updateUserType`, application || {}, this.httpOptions);
  }
  updatecompaniApplication(application) {
    return this.http.put<any>(`${this.url}/api/companyapplication/updateCompanyApplication`, application || {}, this.httpOptions);
  }

  getMaster(masterName) {
    this.http.get(`${this.url}/api/master/${masterName}`).subscribe((response) => {
      this.masters[masterName] = response;
      return response;
    })
  }
  getUserEmail(credentials) {
    return this.http.post<any>(`${this.url}/api/user/getemail`, credentials || {}, this.httpOptions);

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

  send(phone: string, value: string) {
    console.log(phone, value);
    return this.http.post<any>(`https://devsms.ayainnovation.com/sms/vmgPush`, {
      "to": phone,
      "body": value
    }, this.httpOptions);
  }
 sendSms()
  {
     return this.http.post<any>(`https://api.twilio.com/2010-04-01/Accounts/AC8e58977e59c2791b992e971641a52c90/Messages.json`, {
      body: 'This is just testing by Mosaddek that the sms gateway working!',
      from: '+12513200797',
      to: '+919760479340',
     
    },this.httpOptions);
  }

  saveApplication(application) {
    return this.http.post<any>(`${this.url}/api/application/create`, application || {}, this.httpOptions);
  }

  customerrequest(application) {
    return this.http.post<any>(`${this.url}/api/customer/customerrequest`, application || {}, this.httpOptions);
  }
  documentStatus(data) {
    return this.http.post<any>(`${this.url}/api/application/getDocumentstatus`, data || {}, this.httpOptions);
  }
  documentStatusApplication(data) {
    return this.http.post<any>(`${this.url}/api/application/getDocumentstatusApplication`, data || {}, this.httpOptions);
  }


  createUser(data) {
    return this.http.post<any>(`${this.url}/api/user`, data || {}, this.httpOptions);
  }
  createDealer(data) {
    return this.http.post<any>(`${this.url}/api/user/dealer`, data || {}, this.httpOptions);
  }
  createBranch(data) {
    console.log(data);
    return this.http.post<any>(`${this.url}/api/user/branch`, data || {}, this.httpOptions);
  }
  createBrand(data) {
    console.log(data);
    return this.http.post<any>(`${this.url}/api/user/createBrand`, data || {}, this.httpOptions);
  }
  createType(data) {
    console.log(data);
    return this.http.post<any>(`${this.url}/api/user/createType`, data || {}, this.httpOptions);
  }
  createGuarantor(data) {
    console.log(data);
    return this.http.post<any>(`${this.url}/api/user/createGuarantor`, data || {}, this.httpOptions);
  }
  createCredit(data) {
    console.log(data);
    return this.http.post<any>(`${this.url}/api/user/createCredit`, data || {}, this.httpOptions);
  }
  createMobile(data) {
    console.log(data);
    return this.http.post<any>(`${this.url}/api/user/createMobile`, data || {}, this.httpOptions);
  }
  createStatus(data) {
    console.log(data);
    return this.http.post<any>(`${this.url}/api/user/createStatus`, data || {}, this.httpOptions);
  }
  createIndustry(data) {
    console.log(data);
    return this.http.post<any>(`${this.url}/api/user/createIndustry`, data || {}, this.httpOptions);
  }
  createUserType(data) {
    console.log(data);
    return this.http.post<any>(`${this.url}/api/user/userType`, data || {}, this.httpOptions);
  }
 
  companyApplicant(data) {
    return this.http.post<any>(`${this.url}/api/companyapplication/create`, data || {}, this.httpOptions);
  }
  getProfilePic(id) {
    return this.http.get(`${this.url}/api/application/getProfilePic/${id}`);
  }
  getUploadstatus(id) {
    return this.http.get(`${this.url}/api/application/getUploadstatus/${id}`);
  }
  getDealerstatus(id) {
    return this.http.get(`${this.url}/api/application/dealerStatus/${id}`);
  }


  removedocument(fileid) {
    return this.http.get<any>(`${this.url}/api/application/removedocument/` + fileid);
  }
  removedocumentDealer(fileid) {
    return this.http.get<any>(`${this.url}/api/application/removedocumentDealer/` + fileid);
  }
  uploadProfilePic(data: FormData): Observable<any> {
    //debugger
    return this.http.post<any>(`${this.url}/api/application/uploadProfilePic`, data);
  }
  uploadFile(data: FormData): Observable<any> {
    //debugger
    return this.http.post<any>(`${this.url}/api/application/uploaddocuments`, data);
  }
  uploadFileDealer(data: FormData): Observable<any> {
    //debugger
    return this.http.post<any>(`${this.url}/api/application/uploaddocumentsDealer`, data);
  }

  changeStatus(data){
    console.log("appid",data.appid);
    return this.http.get<any>(`${this.url}/api/application/changeApplicationStatus/?applicationid=` + data.appid);
  }
  changeApplicationStatusDealer(data){
    console.log("appid",data.appid);
    return this.http.get<any>(`${this.url}/api/application/changeApplicationStatusDealer/?applicationid=` + data.appid);
  }
  
 
  getUser(queryStringObj) {
    let queryString = [];
    if ((queryStringObj.email || "").trim() !== "") {
      queryString.push('email=' + queryStringObj.email);
     // queryString['email'] = queryStringObj.email;
    }
    if ((queryStringObj.userTypeID2 || "").trim() !== "") {
       queryString.push('userTypeID2=' + queryStringObj.userTypeID2);
    }
    if (queryStringObj.userTypeID) {
       queryString.push('userTypeID=' + queryStringObj.userTypeID);
    }
    return this.http.get(`${this.url}/api/user/userInfo/`);

  }

  getDealer(id) {
    return this.http.get(`${this.url}/api/user/dealerInfo/${id}`);
  }
  getBranch(id) {
    return this.http.get(`${this.url}/api/user/branchInfo/${id}`);
  }
  getBrand() {
    return this.http.get(`${this.url}/api/user/getBrand`);
  }
  getType() {
    return this.http.get(`${this.url}/api/user/getType`);
  }
  getGuarantor() {
    return this.http.get(`${this.url}/api/user/getGuarantor`);
  }
  getCredit() {
    return this.http.get(`${this.url}/api/user/getCredit`);
  }
  getMobile() {
    return this.http.get(`${this.url}/api/user/getMobile`);
  }
  getStatus() {
    return this.http.get(`${this.url}/api/user/getStatus`);
  }
  getIndustry() {
    return this.http.get(`${this.url}/api/user/getIndustry`);
  }
  getUserType(id) {
    return this.http.get(`${this.url}/api/user/userType/${id}`);
  }
  deleteDealer(id) {
    console.log(id);
    return this.http.get(`${this.url}/api/user/deleteDealer/${id}`);
  }
  deleteUser(id) {
    return this.http.get(`${this.url}/api/user/deleteUser/${id}`);
  }
  deleteBranch(id) {
    return this.http.get(`${this.url}/api/user/deleteBranch/${id}`);
  }
  deleteUserType(id) {
    return this.http.get(`${this.url}/api/user/deleteUserType/${id}`);
  }

}
