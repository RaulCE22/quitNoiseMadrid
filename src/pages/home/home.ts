import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  title: string = 'My first AGM project';

  locations: any = [
  {
    lat: 51.378418,
    lng: 7.409007
  },
  {
    lat: 51.578418,
    lng: 7.709007
  },
  {
    lat: 51.478418,
    lng: 7.609007
  }
];

lat: number;
lng: number;

constructor(public navCtrl: NavController) {

  navigator.geolocation.getCurrentPosition(data => {
    this.lat = data.coords.latitude;
    this.lng = data.coords.longitude;
  });
}

}
