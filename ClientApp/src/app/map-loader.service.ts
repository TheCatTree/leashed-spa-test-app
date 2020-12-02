import { Injectable } from '@angular/core';
import { Environment } from '../environments/environment-variables';
declare var window: any;

@Injectable({
  providedIn: 'root'
})
export class MapLoaderService {

  private static promise;
  map: google.maps.Map;
  private static googleMapAPIKey: string;

  constructor() {

  }

  public static load() {
    if(!MapLoaderService.promise) { // load once
      this.googleMapAPIKey = Environment.MYAPP_GOOGLE_MAP_API_KEY;
      MapLoaderService.promise = new Promise((resolve) => {
        window['__onGapiLoaded'] = (ev) =>{
          console.log('gapi loaded')
          resolve(window.gapi);
        }
        console.log('loading..')
        const node = document.createElement('script');
        node.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.googleMapAPIKey;
        node.type = 'text/javascript';
        document.getElementsByTagName('head')[0].appendChild(node);
      });
    }
    return MapLoaderService.promise;
  }

  initMap(gmapElement, lat, lng) {
    return MapLoaderService.load().then((gapi) => {
      this.map = new google.maps.Map(gmapElement.nativeElement, {
        center: new google.maps.LatLng(lat, lng),
        zoom: 12
      });
    });
  }
}
