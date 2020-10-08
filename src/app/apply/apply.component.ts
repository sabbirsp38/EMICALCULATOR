import { Component, OnInit,ViewChild, ElementRef, NgZone,AfterViewInit,VERSION } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GlobalService} from '../service.service';
import * as $AB from 'jquery';
declare var $: any ;
import { MapsAPILoader } from '@agm/core';
 import { Options, LabelType } from 'ng5-slider';

 import { MatHorizontalStepper, MatStep } from '@angular/material';



@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.css']
})

export class ApplyComponent implements OnInit {

  @ViewChild(MatHorizontalStepper, {static: true} ) stepper: MatHorizontalStepper;
  
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



gcode:any = Math.floor((Math.random() * 10000) + 99999);

componentForm = {
  street_number: "short_name",
  route: "long_name",
  locality: "long_name",
  administrative_area_level_1: "short_name",
  country: "long_name",
  postal_code: "short_name"
};






// emical start here

filters: any;
  pemi = {
    value: "25"
  }
  remi = {
    value: "9.5"
  }
  temi = {
    value: "20"
  }
  memi = {
    value: "240"
  }

  query = {
    amount: "",
    interest: "",
    tenureYr: "",
    tenureMo: ""
  }

  result = {
    emi: "",
    interest: "",
    total: ""
  }
  yrToggel: boolean;
  poptions: Options = {
    floor: 1,
    ceil: 100,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return value + '<b>L</b>';
        case LabelType.High:
          return value + '<b>L</b>';
        default:
          return value + '<b>L</b>';
      }
    }
  };
  roptions: Options = {
    floor: 5,
    ceil: 20,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return value + '<b>%</b>';
        case LabelType.High:
          return value + '<b>%</b>';
        default:
          return value + '<b>%</b>';
      }
    }
  };
  toptions: Options = {
    floor: 1,
    ceil: 30,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return value + '<b>Yr</b>';
        case LabelType.High:
          return value + '<b>Yr</b>';
        default:
          return value + '<b>Yr</b>';
      }
    }
  };
  moptions: Options = {
    floor: 1,
    ceil: 360,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return value + '<b>Mo</b>';
        case LabelType.High:
          return value + '<b>Mo</b>';
        default:
          return value + '<b>Mo</b>';
      }
    }
  };

  constructor(private _formBuilder: FormBuilder,private gs: GlobalService,private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) { 

   this.yrToggel = true;  
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
      Employmentname: [''],
      takehomeselary: [''],
      takehomeselarybuseness: [''],
      takehomeselaryprofesonal: [''],


    });
    this.therdFormGroup = this._formBuilder.group({
      carmodel: ['', Validators.required],
      carprice: [''],
      cardelarprice: ['', Validators.required],
      rtocost:    ['', Validators.required],
      insucost:    ['', Validators.required]
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
      yearreturn: ['', Validators.required]
      
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
             console.log(addressType);
            if (this.componentForm[addressType]) {
              const val = component[this.componentForm[addressType]];
              (document.getElementById(addressType) as HTMLInputElement).value = val;
            }
          }
                  
        });
      });
    });

    this.update();








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
      var emi = ((loanAmount * monthlyInterestRatio) * sp);
      var full = numberOfMonths * emi;
      var interest = full - loanAmount;
      var int_pge = (interest / full) * 100;
      this.finalemi = emi.toFixed(0).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      var loanAmount_str = loanAmount.toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.totalamount = full.toFixed(0).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.finalinterest = interest.toFixed(0).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
    console.log("kjbkjbk");
     this.next();
    }
  
}

next(){
  this.stepper.next();
}

  tbupdate(id) {
    if (id == 0) {
      this.pemi.value = (Number(this.query.amount) / 100000).toString();
    }
    else if (id == 1) {
      this.remi.value = this.query.interest;
    }
    else if (id == 2) {
      this.temi.value = this.query.tenureYr;
    }
    else if (id == 3) {
      this.memi.value = this.query.tenureMo;
    }
    this.update();
  }

  update() {

    var loanAmount = Number(this.pemi.value) * 100000;
    var numberOfMonths = (this.yrToggel) ? (Number(this.temi.value) * 12) : Number(this.memi.value);
    var rateOfInterest = Number(this.remi.value);
    var monthlyInterestRatio = (rateOfInterest / 100) / 12;

    this.query.amount = loanAmount.toString();
    this.query.interest = rateOfInterest.toString();
    if (this.yrToggel) {
      this.query.tenureYr = this.temi.value.toString();
    }
    else {
      this.query.tenureMo = this.memi.value.toString();
    }

    var top = Math.pow((1 + monthlyInterestRatio), numberOfMonths);
    var bottom = top - 1;
    var sp = top / bottom;
    var emi = ((loanAmount * monthlyInterestRatio) * sp);
    var full = numberOfMonths * emi;
    var interest = full - loanAmount;
    var int_pge = (interest / full) * 100;

    this.result.emi = emi.toFixed(0).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    var loanAmount_str = loanAmount.toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    this.result.total = full.toFixed(0).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    this.result.interest = interest.toFixed(0).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }




getfilename(){
  let fromfile = this.fileupload.value;
  let disfileName2=fromfile.ufile;
  if(disfileName2===""){

  }else{
       this.disfileName = disfileName2.replace(/.*[\/\\]/, '');
       this.upbuttext="Reupload";
       this.uploadonce=true;
  }
  
}




 get f() { return this.secondFormGroup.controls; }  
 oktocheck(){
  this.checkednow=true;
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


