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

lat: number = 51.678418;
lng: number = 7.809007;

constructor(public navCtrl: NavController) {

}

}
