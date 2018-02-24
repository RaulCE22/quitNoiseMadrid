import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';


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

lat: number = 40.678418;
lng: number = -3.809007;
private parkLocations: any[];
private myDate: string;
private showParks: boolean = false;
constructor(public navCtrl: NavController, private data: DataProvider, private alertCtrl: AlertController) {
  this.myDate = new Date().toISOString();
  navigator.geolocation.getCurrentPosition(data => {
    this.lat = data.coords.latitude;
    this.lng = data.coords.longitude;
  });
}

show = () => {
  this.showParks = true;   
  this.parkLocations = this.data.getParks();
}
hide = () => {
  this.showParks = false; 
  this.parkLocations = []
}

}
