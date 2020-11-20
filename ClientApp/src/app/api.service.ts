import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Environment } from '../environments/environment-variables';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  api_url: string;
  constructor(private http: HttpClient) {
    this.api_url = Environment.MYAPP_API_URL;
    if(this.isBlank(this.api_url)){
      this.api_url = "https://192.168.99.100:5001";
    }
    console.log(this.api_url);

  }

  ping$(): Observable<any> {
    return this.http.get(this.api_url + '/api/parkitems/2');
  }

  token$(): Observable<any> {
    return this.http.get(this.api_url + '/api/token');
  }

  getUserData$(): Observable<any> {
    return this.http.get(this.api_url + '/api/user')
  }

  createtUserData$(): Observable<any> {
    return this.http.post(this.api_url + '/api/user',{})
  }

  createSecureURL$(): Observable<any> {
    return this.http.get(this.api_url + '/api/pictures/upload/test')
  }

  getSecureURL$(): Observable<any> {
    return this.http.get(this.api_url + '/api/pictures/image/test')
  }

  makeBucket$(): Observable<any> {
    return this.http.put(this.api_url + '/s3/test',{})
  }

  isBlank(str) {
    return (!str || /^\s*$/.test(str));
}
}
