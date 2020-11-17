import { Component, OnInit,ViewChild, ElementRef, NgZone,AfterViewInit,VERSION } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GlobalService} from '../service.service';
import * as $AB from 'jquery';
declare var $: any ;
import { MapsAPILoader } from '@agm/core';
import { Options, LabelType } from 'ng5-slider';
import Swal from 'sweetalert2';
import { MatHorizontalStepper, MatStep } from '@angular/material';
import { FileUploader } from "ng2-file-upload";


@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.css']
})

export class ApplyComponent implements OnInit {

  @ViewChild(MatHorizontalStepper, {static: true} ) stepper: MatHorizontalStepper;
  
  public uploader: FileUploader = new FileUploader({
    isHTML5: true
  });
  applicaionData: Object;
  userId: any;
  appid: any;
  deletenabel = false;
  buttonstatus: any;
  url_img1: string = '';
  url_img2: string = '';
  url_img3: string = '';
  applicationType: any;

  private geoCoder;   
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  therdFormGroup: FormGroup;
  forthFormGroup: FormGroup;
  chosecountry: FormGroup;
  kycgroup: FormGroup;
  kycoption: FormGroup;
  monthlycost: FormGroup;
  Congratulation: FormGroup;
  AddressDetails: FormGroup;
  OfficeAddress: FormGroup;
  fileupload: FormGroup;
  carprice:any;
chk;

emi;
full;
interest;

  
brandVal:any;
courency="MMK";
numcode="+95";
mmsg;
umsg;
alartmsg;
displaynumber;
trams;
otpdeclaration;
finalemi;
totalamount;
finalinterest;


showsalary;
getsalary2;


delarprice;
rtocost;
insurensecost;
preapproveamount;
preapproveamountforuser;
totalcarprice;
valueInString;

disprice;
disrto;
disinsu;
disamount;
loanfinal;

disfileName;
disfileName2;
disfileName3;
upbuttext="Upload";

monthlysendamount;
monthlysendamountdispaly;

monthlysalary;
monthlyemiapprovelimit;
oktogo:any=true;



 
subbut:any=false;
smsbut:any=true;
unum:any=true;
uotp:any= false;
verify:any= false;
eamply:any= false;
eamply2:any= false;
eamply3:any= false;
eamply4:any= false;



employmentsec1:any= true;
employmentsec2:any= false;
employmentsec3:any= false;
employmentsec4:any= false;
countryrestic:any= false;
uploadonce:any=false;
checkednow:any = false;
msgcolor:any = false;
renthome:any = false;
ownehome:any = false;


scalolation:any = false;
yeslon:any = false;
nolona:any = false;
totalcostshow:any = false;

requerask:any = false;
requerask2:any = false;
requerask3:any = false;
requerask4:any = false;
requerask5:any = false;
requerask6:any = false;
requerask7:any = false;
requerask8:any = false;
requerask9:any = false;
requerask10:any = false;
requerask11:any = false;
requerask12:any = false;
requerask13:any = false;
requerask14:any = false;


requerask15:any = false;
requerask16:any = false;
requerask17:any = false;
requerask18:any = false;




gcode:any = Math.floor((Math.random() * 10000) + 99999);
applicationid:any = Math.floor((Math.random() * 10000) + 99999);
componentForm = {
  street_number: "short_name",
  route: "long_name",
  locality: "long_name",
  administrative_area_level_1: "short_name",
  country: "long_name",
  postal_code: "short_name"
};







  constructor(private _formBuilder: FormBuilder,private gs: GlobalService,private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) { }


  appendPrice(event) {
   
    const selectEl = (event.target as HTMLSelectElement);
    const val: any = selectEl.options[selectEl.selectedIndex].getAttribute('data-sectionvalue');
    var nn = document.getElementById('carprice') as HTMLInputElement;
     nn.value = val;
     this.carprice = val;
    
  }
uploadSubmit(applicantType, documentType) {

    for (var i = 0; i < this.uploader.queue.length; i++) {
      let fileItem = this.uploader.queue[i]._file;
      if (fileItem.size > 2000000) {
        Swal.fire(
          'warning !',
          'File should be less than 2 MB of size.',
          'warning'
        )

        return;
      }
    }
    for (var j = 0; j < this.uploader.queue.length; j++) {
      let data = new FormData();
      let fileItem = this.uploader.queue[j]._file;
      data.append('applicationid', this.appid);
     // data.append('applicationid', "this.appid");
     // data.append('userid', this.userId._id);
      data.append('userid', 'this.userId._id');
      data.append('applicantType', applicantType);
      data.append('documentType', documentType);
      data.append('applicationType', this.applicationType);
      data.append('deleteStatus', 'no');
      data.append('file', fileItem);
      data.append('fileSeq', 'seq' + j);

      this.gs.uploadFile(data).subscribe((data) => {
       
       console.log(data);
        if (documentType==='nid') 
          this.url_img1 = data.Location as string;
        else if(documentType==='passport')
          this.url_img2 = data.Location as string;
        else if(documentType==='dlisence')
          this.url_img3 = data.Location as string;
       this.deletenabel = true;

      });
    }
    this.uploader.clearQueue();
  }


   hasProp(obj, applicantType, documentType, type) {
    
  }

  downloaddocument(applicantType, documentType, type) {
    // let obj = this.buttonstatus;

    // if (obj.hasOwnProperty(applicantType)) {
    //   if (obj[applicantType].hasOwnProperty(documentType)) {
    //     if (obj[applicantType][documentType].hasOwnProperty(type)) {

    //       if (obj[applicantType][documentType][type].hasOwnProperty('Location')) {

    //          //console.log('output::', obj[applicantType][documentType][type]['Location']);
    //          //return obj[applicantType][documentType][type]['Location'];
    //          this.downloadfile(obj[applicantType][documentType][type]['Location']);
    //       }
    //     } 
    //   } 
    // }
  }

    previewdocument(applicantType,documentType,type) {
    // if(documentType)
    // return obj[applicantType][documentType][type]['Location'];
   
  }

  downloadfile(filepath){
    window.open(filepath, "_self");
  }

  removedocument(applicantType, documentType) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
       
        this.gs.removedocument(this.buttonstatus[applicantType][documentType]['fileres'].documentId).subscribe((data) => {

          this.buttonstatus[applicantType][documentType]['deletenabel'] = false;

          this.buttonstatus[applicantType][documentType]['disabelfile'] = false;
          this.previewdocument(applicantType, documentType, 'fileres');

          // this.gs.documentStatus({ 'applicationid': this.appid, 'documentStatus': this.buttonstatus }).subscribe((data) => {
           
          // });
          
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          this.deletenabel = false;
          window.location.reload();
          

        })
      }
    })
}



  ngOnInit() {
     
    

    

    this.firstFormGroup = this._formBuilder.group({
      
      number: ['', Validators.required],
      numdic:[''],
      code: ['', Validators.required],
      trams: ['']
     
    });
    this.kycgroup = this._formBuilder.group({
      existingaccount: ['']   
    });
    this.kycoption = this._formBuilder.group({
      kycop: ['']
    });
   
    this.secondFormGroup = this._formBuilder.group({
      
      personneame: ['', Validators.required],
      city: ['', Validators.required],
      residencetype: ['', Validators.required],
      employmenttype: ['', Validators.required],

      employmentnamees1: [''],
      takehomeselary: [''],

      emlomentnamees3: [''],
      workexperincees3: [''],
      irtes3: [''],
      applicationtypees3: [''],
      depreciationes3: [''],
      takehomeselarybuseness: [''],

      emlomentnamees4: [''],
      workexperincees4: [''],
      irtes4: [''],
      applicationtypees4: [''],
      depreciationes4: [''],
      takehomeselaryprofesonal: [''],

    });
    this.therdFormGroup = this._formBuilder.group({
      carmodel: ['', Validators.required],
      carprice: [this.carprice || ''],
      cardelarprice: ['', Validators.required],
      rtocost:    ['', Validators.required],
      insucost:    ['', Validators.required],
      
    });
    this.monthlycost = this._formBuilder.group({

      lonarunning: ['', Validators.required],
      currentloan: [''],
      emiamount: [''],
      mrent: [''],
      mexpense: ['', Validators.required],
      numberofemi: [''],
      dilaration:  ['', Validators.required],
     
      
    });
    this.Congratulation = this._formBuilder.group({
      loanamount: ['', Validators.required],
      yearreturn: ['', Validators.required],
     
      
    });

    this.AddressDetails = this._formBuilder.group({
      hadd1: ['', Validators.required],
      hadd2: ['', Validators.required],
      hstate: ['', Validators.required],
      hcity: ['', Validators.required],
      hpcode: ['', Validators.required],
      hpnumber: ['', Validators.required],
      oadd1: ['', Validators.required],
      oadd2: ['', Validators.required],
      ostate: ['', Validators.required],
      ocity: ['', Validators.required],
      opcode: ['', Validators.required],
      opnumber: ['', Validators.required],
      contactaddress: ['', Validators.required]
    });
   
    this.fileupload = this._formBuilder.group({
      ufile: ['']
      
    });
    
     
   
    this.mapsAPILoader.load().then(() => {
    this.geoCoder = new google.maps.Geocoder;
      let autocomplete = new google.maps.places.Autocomplete(document.getElementById('locality') as HTMLInputElement,
    { types: ["geocode"] }); 
      autocomplete.setFields(["address_component"]);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
     
           for (const component in this.componentForm) {
            (document.getElementById(component) as HTMLInputElement).value = "";
            (document.getElementById(component) as HTMLInputElement).disabled = false;
          }
          for (const component of place.address_components as google.maps.GeocoderAddressComponent[]) {
            const addressType = component.types[0];
            if (this.componentForm[addressType]) {
              const val = component[this.componentForm[addressType]];
              (document.getElementById(addressType) as HTMLInputElement).value = val;
            }
          }
                  
        });
      });
    });


   this.gs.getBrand().subscribe((res)=>{
     this.brandVal=res;
     console.log(this.brandVal);
  })






  }
 
 searchBrand(value)
 {
   console.log(value);
  this.gs.getCarBrand(value).subscribe((res)=>{
     this.brandVal=res;
  })
 }


 otppagevarification(){
       let obj2 = this.firstFormGroup.value;
       this.displaynumber=obj2.number;
       this.trams=obj2.trams;
       this.otpdeclaration=obj2.numdic;
       this.alartmsg="Please accept the Mobile, DNC/NDNC, Privacy Policy and Terms and Conditions by selecting the check box.";
       if(this.displaynumber===""){
         
          this.eamply = true;
          this.eamply2 = false;
          this.eamply3 = false;
          this.eamply4 = false;
       }else if(this.otpdeclaration===""){
         this.eamply = false;
         this.eamply2 = true;
         this.eamply3 = false;
         this.eamply4 = true;
         $('#tndalart').modal('show');
         
       } 
       else if(this.trams===""){
        $('#tndalart').modal('show');
         this.eamply = false;
         this.eamply2 = false;
         this.eamply3 = true;
         this.eamply4 = true;
  
       }
       else{
       
            this.sms();
           
           }

 }




  sms(){

       let obj3= "Verification code for your application is "+ this.gcode +".This code only for your identity verification purposes.";
       let obj2 = this.firstFormGroup.value;
       this.displaynumber=obj2.number;
       let obj = {
            number:obj2.number,
            msg:obj3
          }
           this.gs.sms(obj).subscribe((res)=>{
               console.log(res);
              });

           this.verify = true;
           this.smsbut = false;
           this.unum=false;
           this.uotp=true;
           $('#exampleModal').modal('show');

       
      
       
    } 
    votp(){
       let obj2 = this.firstFormGroup.value;
       let otp = obj2.code.toString();
       let gotp = this.gcode.toString();
       console.log(otp);
       console.log(gotp);
       if (otp === gotp) {
          this.mmsg="Successful";
          console.log(this.mmsg);
          this.verify = false;
          this.subbut = true;
          this.msgcolor= true;
        } else {
          this.mmsg="Can't verify your number Please try again.";
          console.log(this.mmsg);
        }
        

       
     }

 comasec(){
   let getsalary=this.secondFormGroup.value;
   this.getsalary2=getsalary.takehomeselary;
   this.showsalary=Number(this.getsalary2).toFixed(0).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
 }

ctes(){
  let fmvalu = this.secondFormGroup.value;
  let employmenttype = fmvalu.employmenttype.toString();
    

     if (employmenttype ==="Salaried"){

      this.employmentsec1=true;
      this.employmentsec2=false;
      this.employmentsec3=false;
      this.employmentsec4=false;

   }else if (employmenttype ==="SelfEmployedbusiness"){
      this.employmentsec1=false;
      this.employmentsec2=false;
      this.employmentsec3=true;
      this.employmentsec4=false;

   }else if (employmenttype ==="SelfEmployedProfessional"){
      this.employmentsec1=false;
      this.employmentsec2=false;
      this.employmentsec3=false;
      this.employmentsec4=true;

   }else{
      this.employmentsec1=false;
      this.employmentsec2=false;
      this.employmentsec3=false;
      this.employmentsec4=false;

   }



   
}

 emptyfiledcheck(){
  let fmvalu = this.secondFormGroup.value;
  let employmenttype = fmvalu.employmenttype.toString();
  let employmentnamees1 = fmvalu.employmentnamees1;
  let takehomeselary = fmvalu.takehomeselary;

  let emlomentnamees3 = fmvalu.emlomentnamees3;
  let workexperincees3 = fmvalu.workexperincees3;
  let irtes3 = fmvalu.irtes3;
  let applicationtypees3 = fmvalu.applicationtypees3;
  let depreciationes3 = fmvalu.depreciationes3;
  let takehomeselarybuseness = fmvalu.takehomeselarybuseness;


  let emlomentnamees4 = fmvalu.emlomentnamees4;
  let workexperincees4 = fmvalu.workexperincees4;
  let irtes4 = fmvalu.irtes4;
  let applicationtypees4 = fmvalu.applicationtypees4;
  let depreciationes4 = fmvalu.depreciationes4;
  let takehomeselaryprofesonal = fmvalu.takehomeselaryprofesonal;


   
    

    if (employmenttype ==="Salaried"){


      if(employmentnamees1==="" && takehomeselary===""){

         this.requerask=true;
         this.requerask2=true;
      }else if(employmentnamees1===""){
      
         this.requerask=true;
      }else if(takehomeselary===""){
          this.requerask2=true;
          this.requerask=false;
      }else{
         this.requerask=false;  
         this.requerask2=false; 
         this.next();

      }

   }else if (employmenttype ==="SelfEmployedbusiness"){

    if(  emlomentnamees3==="" && workexperincees3==="" && irtes3==="" && applicationtypees3==="" && depreciationes3==="" && takehomeselarybuseness===""){

         this.requerask3=true;
         this.requerask4=true;
         this.requerask5=true;
         this.requerask6=true;
         this.requerask7=true;
         this.requerask8=true;
      }else if(emlomentnamees3===""){
      
         this.requerask3=true;
         this.requerask4=false;
         this.requerask5=false;
         this.requerask6=false;
         this.requerask7=false;
         this.requerask8=false;
      }else if(workexperincees3===""){
      
         this.requerask4=true;
         this.requerask3=false;
         this.requerask5=false;
         this.requerask6=false;
         this.requerask7=false;
         this.requerask8=false;
      }else if(irtes3===""){
      
         this.requerask5=true;
         this.requerask3=false;
         this.requerask4=false;
         this.requerask6=false;
         this.requerask7=false;
         this.requerask8=false;
      }else if(applicationtypees3===""){
      
         this.requerask6=true;
         this.requerask3=false;
         this.requerask4=false;
         this.requerask5=false;
         this.requerask7=false;
         this.requerask8=false;
      }else if(depreciationes3===""){
      
         this.requerask7=true;
         this.requerask3=false;
         this.requerask4=false;
         this.requerask5=false;
         this.requerask6=false;
         this.requerask8=false;
      }else if(takehomeselarybuseness===""){
          this.requerask8=true;
          this.requerask3=false;
         this.requerask4=false;
         this.requerask5=false;
         this.requerask6=false;
         this.requerask7=false;
          
      }else{
         this.requerask3=false;
         this.requerask4=false;
         this.requerask5=false;
         this.requerask6=false;
         this.requerask7=false;
         this.requerask8=false;
         this.next();

      }
      
   }else if (employmenttype ==="SelfEmployedProfessional"){
    if(  emlomentnamees4==="" && workexperincees4==="" && irtes4==="" && applicationtypees4==="" && depreciationes4==="" && takehomeselaryprofesonal===""){

         this.requerask9=true;
         this.requerask10=true;
         this.requerask11=true;
         this.requerask12=true;
         this.requerask13=true;
         this.requerask14=true;
      }else if(emlomentnamees4===""){
      
         this.requerask9=true;

         this.requerask10=false;
         this.requerask11=false;
         this.requerask12=false;
         this.requerask13=false;
         this.requerask14=false;
         
      }else if(workexperincees4===""){
      
         this.requerask10=true;
         this.requerask9=false;
         
         this.requerask11=false;
         this.requerask12=false;
         this.requerask13=false;
         this.requerask14=false;
         
      }else if(irtes4===""){
      
         this.requerask11=true;
         this.requerask9=false;
         this.requerask10=false;
    
         this.requerask12=false;
         this.requerask13=false;
         this.requerask14=false;
        
      }else if(applicationtypees4===""){
      
         this.requerask12=true;
         this.requerask9=false;
         this.requerask10=false;
         this.requerask11=false;
        
         this.requerask13=false;
         this.requerask14=false;
         
      }else if(depreciationes4===""){
      
         this.requerask13=true;
         this.requerask9=false;
         this.requerask10=false;
         this.requerask11=false;
         this.requerask12=false;
      
         this.requerask14=false;
         
      }else if(takehomeselaryprofesonal===""){
        this.requerask14=true;
        this.requerask9=false;
         this.requerask10=false;
         this.requerask11=false;
         this.requerask12=false;
         this.requerask13=false;
        
        
          
      }else{
         this.requerask9=false;
         this.requerask10=false;
         this.requerask11=false;
         this.requerask12=false;
         this.requerask13=false;
         this.requerask14=false;
         this.next();

      }

   }else{
      

   }





 }

disposableincome(){
  let fmvalu = this.secondFormGroup.value;
  let employmenttype = fmvalu.employmenttype.toString();

  let takehomeselary = fmvalu.takehomeselary;
  let takehomeselarybuseness = fmvalu.takehomeselarybuseness;
  let takehomeselaryprofesonal = fmvalu.takehomeselaryprofesonal;
  


     if (employmenttype ==="Salaried"){
          this.monthlysalary=Number(takehomeselary);
         

   }else if (employmenttype ==="SelfEmployedbusiness"){
         let ysalary=takehomeselarybuseness/12;
          this.monthlysalary=Number(ysalary);

          

   }else if (employmenttype ==="SelfEmployedProfessional"){
          let ysalary=takehomeselaryprofesonal/12;
          this.monthlysalary=Number(ysalary);

    }else{
      this.monthlysalary=Number(takehomeselary);
    }

         


}
cresidencetype(){
  let fmvalu = this.secondFormGroup.value;
  let residencetype = fmvalu.residencetype.toString();
  if(residencetype==="Companyprovided" || residencetype==="Ownedbyself" || residencetype==="Ownedbyparent"){
    this.renthome = false;
    this.ownehome = false;
   }else if(residencetype==="Hostel" || residencetype==="Payingguest" ||residencetype==="Rentedstayingalone" ||residencetype==="entedwithfamily" || residencetype==="Rentedwithsfriends"){
    this.renthome = true;
    this.ownehome = false;
   }
   else{
    this.renthome = false;
    this.ownehome = false;
   }

}

getloninfo(){
   let loaninfo = this.monthlycost.value;
   let loanstutas = loaninfo.lonarunning.toString();

  

   if(loanstutas==="No"){
    
      this.yeslon= false;
      this.nolona= true;
      
   }else if(loanstutas==="Yes"){
      
       this.yeslon= true;
      this.nolona= false;
     
   }else{
      
       this.yeslon= false;
      this.nolona= false;
     
   }

  

   
}

checkfildvalidation(){
  let loaninfo = this.monthlycost.value;
  let loanstutas = loaninfo.lonarunning.toString();
  let currentloan= loaninfo.currentloan;
  let numberofemi= loaninfo.numberofemi;
  let emiamount= loaninfo.emiamount;
  let   mrent= loaninfo.mrent;


  let fmvalu = this.secondFormGroup.value;
  let residencetype = fmvalu.residencetype.toString();


  if(residencetype==="Hostel" || residencetype==="Payingguest" ||residencetype==="Rentedstayingalone" ||residencetype==="entedwithfamily" || residencetype==="Rentedwithsfriends"){
    this.renthome = true;
    this.ownehome = false;
   }
  

 if(loanstutas==="Yes"){


      
       if(currentloan==="" && numberofemi==="" && emiamount==="" ){

         this.requerask15=true;
         this.requerask16=true;
         this.requerask17=true;
      }else if(currentloan===""){
      
         this.requerask15=true;
         this.requerask16=false;
         this.requerask17=false; 
      }else if(numberofemi===""){
          this.requerask16=true;
          this.requerask15=false;
          this.requerask17=false; 
         
      }else if(emiamount===""){
          this.requerask17=true;
          this.requerask15=false;
          this.requerask16=false;
 
         
      }else{
         this.requerask15=false;
         this.requerask16=false;
         this.requerask17=false;
         this.requerask18=false; 
         this.next();

      }
     
   }else{
      
       
     
   }
}

monthlyexpencess(){
  let loaninfo = this.monthlycost.value;
  let emiamount = loaninfo.emiamount;
  let mexpense = loaninfo.mexpense;
  let mrent = loaninfo.mrent;

  if(emiamount==="" && mrent===""){
    this.monthlysendamount=parseInt(mexpense);
    this.totalcostshow= true ;
  }else if(mexpense==="" && mrent===""){
    this.monthlysendamount=parseInt(emiamount);
    this.totalcostshow=true;
  }else if(emiamount===""){
    this.monthlysendamount=parseInt(mexpense)  +parseInt(mrent);
    this.totalcostshow=true;
  }else if(mrent===""){
    this.monthlysendamount=parseInt(emiamount)  +parseInt(mexpense);
    this.totalcostshow=true;
  }else{
    this.monthlysendamount=parseInt(emiamount)  +parseInt(mexpense)  +parseInt(mrent);
    this.totalcostshow=true;
  }


  
  this.monthlysendamountdispaly = Number(this.monthlysendamount).toFixed(0).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");


 
    
}


preapprovecalcolator(){
    let approvalu = this.therdFormGroup.value;
    this.delarprice = approvalu.cardelarprice;
    this.rtocost = approvalu.rtocost;
    this.insurensecost = approvalu.insucost;
    
    this.disprice = Number(this.delarprice).toFixed(0).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    this.disrto = Number(this.rtocost).toFixed(0).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    this.disinsu = Number(this.insurensecost).toFixed(0).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    

    if(this.delarprice==="" || this.rtocost===""|| this.insurensecost===""){
          
    }else{
      // var totalcarprice2=delarprice  + rtocost  +  insurensecost;
      this.valueInString =parseInt(this.delarprice)  + parseInt(this.rtocost)  +  parseInt(this.insurensecost);
      var num = parseFloat(this.valueInString);
      
      this.totalcarprice = this.valueInString.toFixed(0).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      
    }

    

}

getemilimit(){
  
   let monthyincome= this.monthlysalary - this.monthlysendamount;
   this.monthlyemiapprovelimit = monthyincome - (monthyincome * .20);
   console.log(this.monthlyemiapprovelimit);
}


emaicalculator() {
    this.getemilimit();
    let congvalu = this.Congratulation.value;
    // let countryname = congvalu.loanamount;
    var loanAmount = Number(congvalu.loanamount) ;
    this.loanfinal= Number(congvalu.loanamount) ;
    var yearreturn = congvalu.yearreturn;
    var numberOfMonths = congvalu.yearreturn*12;
    
     this.disamount = Number(loanAmount).toFixed(0).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
     this.preapproveamount = this.monthlyemiapprovelimit * numberOfMonths;
     this.preapproveamountforuser =this.preapproveamount.toFixed(0).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");



   if(loanAmount!==0 && yearreturn!==0){
    

    if(loanAmount > this.preapproveamount){
     alert("The Loan amount exceeds the permissible limit.");


    }else{
      
      var rateOfInterest = 9.5;
      var monthlyInterestRatio = (rateOfInterest / 100) / 12;


      var top = Math.pow((1 + monthlyInterestRatio), numberOfMonths);
      var bottom = top - 1;
      var sp = top / bottom;
       this.emi = ((loanAmount * monthlyInterestRatio) * sp);
       this.full = numberOfMonths * this.emi;
       this.interest = this.full - loanAmount;
      var int_pge = (this.interest / this.full) * 100;
      this.finalemi = this.emi.toFixed(0).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      var loanAmount_str = loanAmount.toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.totalamount = this.full.toFixed(0).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.finalinterest = this.interest.toFixed(0).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.scalolation=true;
      
     }
       
   }else{

       this.scalolation=false;
    }


    

    

  }
finalamountcheck(){
  if(this.loanfinal > this.preapproveamount){
     alert("The Loan amount exceeds the permissible limit.");
      
  }else{
    
     this.next();
    }
  
}

next(){
  this.stepper.next();
}






getfilename(){
  let fromfile = this.fileupload.value;
  let disfileName2=fromfile.ufile;
  if(disfileName2===""){

  }else{
       this.disfileName = disfileName2.replace(/.*[\/\\]/, '');
       this.upbuttext="Upload";
       this.uploadonce=true;
  }
  
}




 get f() { return this.secondFormGroup.controls; }  

 oktocheck(){
  this.checkednow=true;
 }




  submit(){
       let finalData = {};
       let obj2 = this.firstFormGroup.value;
       finalData['personalDetails'] =this.secondFormGroup.value;
       finalData['expenditureDetails'] =this.monthlycost.value;
       finalData['vehicleDetails'] =this.therdFormGroup.value;
       finalData['eligibilityResult'] =this.Congratulation.value;
       finalData['addressDetails'] =this.AddressDetails.value;
       finalData['number'] =obj2.number;
       finalData['montyspendamount'] =this.monthlysendamount;
       finalData['applicationid'] =this.applicationid;
       finalData['mothyemi'] =this.finalemi;
       finalData['fullamountreplay'] =this.totalamount;
       finalData['totalinterest'] =this.finalinterest;
       finalData['preapproveamount'] =this.preapproveamountforuser;
       finalData['totalcarprice'] =this.totalcarprice;
       finalData['applicationStatus'] ='New';
       finalData['documentStatus'] ='';
       finalData['carprice'] =this.carprice;
            
      console.log(finalData);
      this.gs.apply(finalData).subscribe((res)=>{
        console.log(res);
        this.appid = res._id;
      });
      
  }


}


