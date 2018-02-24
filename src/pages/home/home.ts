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

lat: number;
lng: number;
private parkLocations: any[];
private noisePollutionLocations: any[];
private soundReceptors: any[];

private myDate: string;
private showParks: boolean = false;
constructor(public navCtrl: NavController, private data: DataProvider) {
  this.myDate = new Date().toISOString();
  navigator.geolocation.getCurrentPosition(data => {
    this.lat = data.coords.latitude;
    this.lng = data.coords.longitude;
  });
}

ionViewDidLoad(){
  this.noisePollutionLocations = this.data.getNoisePollution();  
  console.log(this.noisePollutionLocations);
}

show = () => {
  this.showParks = true;   
  this.parkLocations = this.data.getParks();
}
hide = () => {
  this.showParks = false; 
  this.parkLocations = []
}
getNoises(){
  let date = new Date(Date.parse(this.myDate));
  this.data.getNoises(date);
  let getLocation = () =>{
    return {latitude: 40.678418, longitude: -3.809007}
  }
  let getColor = (cont_value: number) => {
    var color = 'red';
    if(cont_value < 35)
      color = 'red';
    if(cont_value >= 35 && cont_value < 60)
      color = 'orange';
    if(cont_value >= 60)
      color = 'green';
  }
  this.soundReceptors = [{
    location: {latitude: 40.678418, longitude: -3.809007},
    color: getColor(50)
  }]
  console.log(this.soundReceptors)
}
}
