import { InterceptorService, InterceptorAddAuthenticatoin } from './interceptor.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Environment } from '../environments/environment-variables';
import { dog } from './models/dog';


const headers = new HttpHeaders().set(InterceptorAddAuthenticatoin,'');

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
    return this.http.get(this.api_url + '/api/parkitems/2',{ headers });
  }

  token$(): Observable<any> {
    return this.http.get(this.api_url + '/api/token',{ headers });
  }

  getUserData$(): Observable<any> {
    return this.http.get(this.api_url + '/api/user',{ headers })
  }

  createtUserData$(): Observable<any> {
    return this.http.post(this.api_url + '/api/user',{},{ headers })
  }

  createSecureURL$(name: string): Observable<any> {
    return this.http.get(this.api_url + '/api/pictures/upload/' + name,{ headers })
  }

  getSecureURL$(): Observable<any> {
    return this.http.get(this.api_url + '/api/pictures/image/test',{ headers })
  }

  createDog$(dog: dog): Observable<any> {
    return this.http.post(this.api_url + '/api/dogs',dog,{ headers })
  }

  isBlank(str) {
    return (!str || /^\s*$/.test(str));
  }

  getDogs$( id: number): Observable<any> {
    return this.http.get(this.api_url + '/user/' + id +'/dogs',{ headers })
  }

  getImages$(): Observable<any> {
    return this.http.get(this.api_url + '/api/pictures/images',{ headers })
  }

  getUsers$(): Observable<any> {
    return this.http.get(this.api_url + '/api/user/listusers',{ headers })
  }

  getfriends$(): Observable<any> {
    return this.http.get(this.api_url + '/api/user/friends',{ headers })
  }

  addFriend$(id: number): Observable<any> {
    return this.http.post(this.api_url + '/api/user/addFriend' + id,{},{ headers })
  }
}

