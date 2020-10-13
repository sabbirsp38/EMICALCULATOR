import { Component, OnInit,ViewChild, ElementRef, NgZone,AfterViewInit,VERSION } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GlobalService} from '../service.service';
import * as $AB from 'jquery';
declare var $: any ;
import { MapsAPILoader } from '@agm/core';
import { Options, LabelType } from 'ng5-slider';
import { MatHorizontalStepper, MatStep } from '@angular/material';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

	isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;


  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {

     
  }

}
