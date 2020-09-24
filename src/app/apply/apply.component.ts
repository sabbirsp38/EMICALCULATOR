import { Component, OnInit,ViewChild, ElementRef, NgZone,AfterViewInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GlobalService} from '../service.service';
import * as $AB from 'jquery';
declare var $: any ;
import { MapsAPILoader } from '@agm/core';


@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.css']
})

export class ApplyComponent implements OnInit {
  
  private geoCoder;   
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  therdFormGroup: FormGroup;
  forthFormGroup: FormGroup;
  chosecountry: FormGroup;
  kycgroup: FormGroup;
  kycoption: FormGroup;
  Congratulation: FormGroup;
  AddressDetails: FormGroup;
  OfficeAddress: FormGroup;
  fileupload: FormGroup;

courency;
numcode;
mmsg;
umsg;
alartmsg;
displaynumber;
trams;
otpdeclaration;
finalemi;
totalamount;
finalinterest;

 
subbut:any=false;
smsbut:any=true;
unum:any=true;
uotp:any= false;
verify:any= false;
eamply:any= false;
employmentsec1:any= false;
employmentsec2:any= false;
employmentsec3:any= false;
employmentsec4:any= false;
countryrestic:any= false;


gcode:any = Math.floor((Math.random() * 10000) + 99999);

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

  ngOnInit() {
     
  	this.chosecountry = this._formBuilder.group({
      cname: ['']
      // cname: ['', Validators.required]
    });
    this.firstFormGroup = this._formBuilder.group({
      number: [''],
      numdic:[''],
      code: [''],
      trams: ['']
     
    });
    this.kycgroup = this._formBuilder.group({
      existingaccount: ['']
     
     
    });
    this.kycoption = this._formBuilder.group({
      kycop: ['']
     
     
    });
   
    this. secondFormGroup = this._formBuilder.group({
      
      city: [''],
      residencetype: [''],
      employmenttype: [''],
      Employmentname: [''],
      salary: ['']
    });
    this.therdFormGroup = this._formBuilder.group({
      carmodel: [''],
      carprice: [''],
      cardelar: [''],
      rtoin:    [''],
      insin:    ['']
    });
    this.Congratulation = this._formBuilder.group({
      loanamount: [''],
      yearreturn:    ['']
      
    });

    this.AddressDetails = this._formBuilder.group({
      hadd1: ['']
    });
    this.OfficeAddress = this._formBuilder.group({
      oadd1: ['']
     
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
             console.log(addressType);
            if (this.componentForm[addressType]) {
              const val = component[this.componentForm[addressType]];
              (document.getElementById(addressType) as HTMLInputElement).value = val;
            }
          }
                  
        });
      });
    });










  }

    cmsg(){
    let fmvalu = this.chosecountry.value;
    let countryname = fmvalu.cname.toString();
    console.log(countryname);
     if (countryname ===""){
      this.umsg="You have to choose a country.";
   } else if(countryname ==="India"){
    this.umsg="Loan Pre-Qualification from credit agency is applicable for your country";
    this.countryrestic= true;
    this.courency="INR";
    this.numcode="+91";
   } else if(countryname ==="Myanmar"){
    this.umsg="Loan Pre-Qualification from credit agency is not applicable for your country";
    this.countryrestic= false;
    this.courency="MMK";
    this.numcode="+95";
   } else if(countryname ==="Vietnam"){
    this.umsg="Loan Pre-Qualification from credit agency is not applicable for your country";
    this.countryrestic= false;
    this.courency="VND";
    this.numcode="+84";
   } else if(countryname ==="Phillipines"){
    this.umsg="Loan Pre-Qualification from credit agency is not applicable for your country";
    this.countryrestic= false;
    this.courency="PESO";
    this.numcode="+63";
   }else {
    this.umsg="Loan Pre-Qualification from credit agency is not applicable for your country";
   }

 } 
    sms(){
       let obj3= "Verification code for your application is "+ this.gcode +".This code only for your identity verification purposes.";
       let obj2 = this.firstFormGroup.value;
       this.displaynumber=obj2.number;
       this.trams=obj2.trams;
       this.otpdeclaration=obj2.numdic;
       if(this.otpdeclaration===""){
         $('#tndalart').modal('show');
         this.eamply = true;
         this.alartmsg="You have to declare that this number belongs to you by selecting the checkbox.";

       }else if(this.trams===""){
        $('#tndalart').modal('show');
        this.eamply = true;
        this.alartmsg="Please accept the  Privacy Policy and Terms and Conditions by selecting the check box.";
       }else if(this.displaynumber===""){
         
          this.eamply = true;
       }
       else{
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
        } else {
          this.mmsg="Can't verify your number Please try again.";
          console.log(this.mmsg);
        }
        

       
     }

kycoptionc(){

}

ctes(){
  let fmvalu = this.secondFormGroup.value;
    let employmenttype = fmvalu.employmenttype.toString();
    console.log(employmenttype);
     if (employmenttype ==="Salaried"){
      this.employmentsec1=true;
      this.employmentsec2=false;
      this.employmentsec3=false;
      this.employmentsec4=false;

   }else if (employmenttype ==="SalariedDoctor"){
      this.employmentsec1=false;
      this.employmentsec2=true;
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

emaicalculator() {
    let congvalu = this.Congratulation.value;
    // let countryname = congvalu.loanamount;
    var loanAmount = congvalu.loanamount ;
    var numberOfMonths = congvalu.yearreturn*12;
    var rateOfInterest = 7;
    var monthlyInterestRatio = (rateOfInterest / 100) / 12;


    var top = Math.pow((1 + monthlyInterestRatio), numberOfMonths);
    var bottom = top - 1;
    var sp = top / bottom;
    var emi = ((loanAmount * monthlyInterestRatio) * sp);
    var full = numberOfMonths * emi;
    var interest = full - loanAmount;
    var int_pge = (interest / full) * 100;
     this.finalemi = emi.toFixed(0).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    var loanAmount_str = loanAmount.toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
     this.totalamount = full.toFixed(0).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
     this.finalinterest = interest.toFixed(0).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");


  }


  submit(){
      
       let obj2 = this.firstFormGroup.value;
       
      let obj = {
        number:obj2.number
      }
      
      this.gs.apply(obj).subscribe((res)=>{
        console.log(res);
      });
      
  }


}


