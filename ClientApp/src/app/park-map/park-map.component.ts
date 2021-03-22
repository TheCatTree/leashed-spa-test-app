import { MapLoaderService } from './../map-loader.service';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Inject, Renderer2 } from '@angular/core';
import { VolumeId } from 'aws-sdk/clients/storagegateway';
import { Environment } from '../../environments/environment-variables';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-park-map',
  templateUrl: './park-map.component.html',
  styleUrls: ['./park-map.component.css']
})

export class ParkMapComponent implements OnInit {
  @ViewChild('mapContainer') gmapElement: any;
  lat = 40.730610;
  lng = -73.935242;

  currentLong: number;
  currentLat: number;

  marker: google.maps.Marker;
  kmlLayer: google.maps.KmlLayer;
  autocomplete: google.maps.places.Autocomplete;
  src: string;

  googleMapAPIKey: string;
   map: google.maps.Map;
  infoWindow: google.maps.InfoWindow;

  constructor(@Inject(DOCUMENT) private document: Document,
    private renderer2: Renderer2
  ) {
    this.googleMapAPIKey = Environment.MYAPP_GOOGLE_MAP_API_KEY;
  }

  ngOnInit() {
    const url = 'https://maps.googleapis.com/maps/api/js?key=' + this.googleMapAPIKey + "&libraries=places";


    this.src = 'https://storage.googleapis.com/dev-kml/(DEV)Dog_Exercise_Restriction_Layer_polygon_test.kml';

    this.loadScript(url).then(() => {
      this.loadMap();
    }).then(() => {
      this.addKML();
    }).then(() => {
      this.loadAutocomplete();
      this.findMe();
    });

  }

  private loadMap() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: this.lat, lng: this.lng },
      zoom: 8,
    });
  }

  private loadScript(url) {
    return new Promise((resolve, reject) => {
      const script = this.renderer2.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      script.text = ``;
      script.onload = resolve;
      script.onerror = reject;
      this.renderer2.appendChild(this.document.body, script);
    })
  }

  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.showPosition(position);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  showPosition(position) {
    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;

    let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    this.map.panTo(location);

    if (!this.marker) {
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
        title: 'Got you!'
      });
    }
    else {
      this.marker.setPosition(location);
    }
  }

  addKML(){
    this.kmlLayer = new google.maps.KmlLayer( {
      url: this.src,
      suppressInfoWindows: true,
      preserveViewport: false,
      map: this.map
    });
    this.kmlLayer.addListener('click',this.createInfoWindow );

  }

  private loadAutocomplete(){
    const input = document.getElementById("location-search-box") as HTMLInputElement;
    const center = { lat: this.lat, lng: this.lng };
    const defaultBounds = {
      north: center.lat + 0.1,
      south: center.lat - 0.1,
      east: center.lng + 0.1,
      west: center.lng - 0.1,
    };
    const options = {
      bounds: defaultBounds,
      componentRestrictions: { country: "nz" },
      fields: ["address_components", "geometry", "icon", "name"],
      origin: center,
      strictBounds: false,
      types: ["establishment"],
    };
    this.autocomplete = new google.maps.places.Autocomplete(input, options);
    this.autocomplete.addListener("place_changed", this.changeMapCenter.bind(this));
    console.log("autocomplete built");
  }
  private changeMapCenter(){
    console.log("changeMapCenter");
    let place = this.autocomplete.getPlace();
    this.marker.setPosition(place.geometry.location);
    this.map.panTo(place.geometry.location);
    console.log(place.geometry.location);


  }

  private createInfoWindow(event){
    this.infoWindow = new google.maps.InfoWindow();
    this.infoWindow.setContent(event.featureData.name);
    console.log(event.featureData.name);
    this.infoWindow.setPosition(event.latLng);
    this.infoWindow.open(this.map);
  }

}
