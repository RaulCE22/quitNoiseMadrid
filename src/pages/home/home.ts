import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

lat: number;
lng: number;
private parkLocations: any[];
private noisePollutionLocations: any[];
private soundReceptors: any[];

private myDate: string;
private timeOfDay: number = 1;
private showParks: boolean = false;
constructor(public navCtrl: NavController, private data: DataProvider) {
  this.myDate = new Date().toISOString();
  navigator.geolocation.getCurrentPosition(data => {
    this.lat = data.coords.latitude;
    this.lng = data.coords.longitude;
  });
  this.getNoises();
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
  let noiseStations = this.data.getNoisesStations();
  this.data.getNoises(this.timeOfDay,date).subscribe(d => {
    d.map(noise => {
      noise.location = noiseStations[noise.district];
      noise.color = getColor(noise.cont_value);
    })
    this.soundReceptors = d
    console.log(this.soundReceptors)
  });
  
  let getLocation = () =>{
    return {latitude: 40.678418, longitude: -3.809007}
  }
  let getColor = (cont_value: number) => {

    cont_value = ( (cont_value - 60) / (70 - 60) ) * 100;

    var hsv2rgb = function(h, s, v) {
      // adapted from http://schinckel.net/2012/01/10/hsv-to-rgb-in-javascript/
      var rgb, i, data = [];
      if (s === 0) {
        rgb = [v,v,v];
      } else {
        h = h / 60;
        i = Math.floor(h);
        data = [v*(1-s), v*(1-s*(h-i)), v*(1-s*(1-(h-i)))];
        switch(i) {
          case 0:
            rgb = [v, data[2], data[0]];
            break;
          case 1:
            rgb = [data[1], v, data[0]];
            break;
          case 2:
            rgb = [data[0], v, data[2]];
            break;
          case 3:
            rgb = [data[0], data[1], v];
            break;
          case 4:
            rgb = [data[2], data[0], v];
            break;
          default:
            rgb = [v, data[0], data[1]];
            break;
          }
        }
        return '#' + rgb.map(function(x){
          return ("0" + Math.round(x*255).toString(16)).slice(-2);
        }).join('');
      };

    var h= Math.floor((100 - cont_value) * 120 / 100);
    //var s = Math.abs(cont_value - 50)/50;
    var s = 1;
    var v = 1;
 
    return hsv2rgb(h, s, 1);
  }
}
}
