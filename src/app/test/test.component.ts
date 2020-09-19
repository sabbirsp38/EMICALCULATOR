import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
private geoCoder;

//   componentForm = {
//   street_number: "short_name",
//   route: "long_name",
//   locality: "long_name",
//   administrative_area_level_1: "short_name",
//   country: "long_name",
//   postal_code: "short_name"
// };

componentForm = {
  locality: "long_name"
};
  constructor(private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) { }

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
}
