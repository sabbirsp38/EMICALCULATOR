import { Component, OnInit, ViewChild, ElementRef, NgZone, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

 import { MapsAPILoader } from '@agm/core';
 import { Options, LabelType } from 'ng5-slider';
import * as $AB from 'jquery';
declare var $: any ;

// import { MustMatch } from '/validation';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
// private geoCoder;

// componentForm = {
//   street_number: "short_name",
//   route: "long_name",
//   locality: "long_name",
//   administrative_area_level_1: "short_name",
//   country: "long_name",
//   postal_code: "short_name"
// };
registerForm: FormGroup;
    submitted = false;

  constructor(private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,private formBuilder: FormBuilder) { }

  ngOnInit() {


    // this.mapsAPILoader.load().then(() => {
    //   this.geoCoder = new google.maps.Geocoder;
    //   let autocomplete = new google.maps.places.Autocomplete(document.getElementById('search') as HTMLInputElement,
    // { types: ["geocode"] }); 
    //   autocomplete.setFields(["address_component"]);
    //   autocomplete.addListener("place_changed", () => {
    //     this.ngZone.run(() => {
    //       let place: google.maps.places.PlaceResult = autocomplete.getPlace();
     
    //        for (const component in this.componentForm) {
    //         (document.getElementById(component) as HTMLInputElement).value = "";
    //         (document.getElementById(component) as HTMLInputElement).disabled = false;
    //       }
    //       for (const component of place.address_components as google.maps.GeocoderAddressComponent[]) {
    //         const addressType = component.types[0];
    //          console.log(addressType);
    //         if (this.componentForm[addressType]) {
    //           const val = component[this.componentForm[addressType]];
    //           (document.getElementById(addressType) as HTMLInputElement).value = val;
    //         }
    //       }
                  
    //     });
    //   });
    // });


   this.registerForm = this.formBuilder.group({
            nasdasdae: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required],
            acceptTerms: [false, Validators.requiredTrue]
        });






}




 // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        // display form values on success
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    }

    onReset() {
        this.submitted = false;
        this.registerForm.reset();
    }













}










