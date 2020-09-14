import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GlobalService} from '../service.service';


@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.css']
})

export class ApplyComponent implements OnInit {
  
     
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  therdFormGroup: FormGroup;
  forthFormGroup: FormGroup;
  chosecountry: FormGroup;

mmsg;
 
subbut:any=false;
smsbut:any=true;
unum:any=true;
uotp:any= false;
verify:any= false;
gcode:any = Math.floor((Math.random() * 10000) + 99999);

  constructor(private _formBuilder: FormBuilder,private gs: GlobalService) { }

  ngOnInit() {
     
  	this.chosecountry = this._formBuilder.group({
      sdds: ['', Validators.required]
     
     
    });
    this.firstFormGroup = this._formBuilder.group({
      number: ['', Validators.required],
      code: ['', Validators.required]
     
    });
   
    this. secondFormGroup = this._formBuilder.group({
      
      city: ['', Validators.required],
      residencetype: ['', Validators.required],
      employmenttype: ['', Validators.required],
      Employmentname: ['', Validators.required],
      salary: ['', Validators.required]
    });
    this.therdFormGroup = this._formBuilder.group({
      carmodel: ['', Validators.required],
      carprice: ['', Validators.required],
      cardelar: ['', Validators.required],
      rtoin:    ['', Validators.required],
      insin:    ['', Validators.required]
    });
    
    
  }
    sms(){
      
       let obj3= "Verification code for your application is "+ this.gcode +".This code only for your identity verification purposes.";
       let obj2 = this.firstFormGroup.value;
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


