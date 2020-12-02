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
  src: string;

  googleMapAPIKey: string;
   map: google.maps.Map;
  constructor(@Inject(DOCUMENT) private document: Document,
    private renderer2: Renderer2
  ) {
    this.googleMapAPIKey = Environment.MYAPP_GOOGLE_MAP_API_KEY;
  }

  ngOnInit() {
    const url = 'https://maps.googleapis.com/maps/api/js?key=' + this.googleMapAPIKey;
    this.src = 'https://storage.googleapis.com/dev-kml/Dog_Exercise_Restriction_Layer%20(1).kml';

    this.loadScript(url).then(() => {
      this.loadMap()
    }).then(() => {
      this.addKML()
    })
    .then(() => {
      this.findMe()
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
      this.renderer2.appendChild(this.document.head, script);
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
  }

}
