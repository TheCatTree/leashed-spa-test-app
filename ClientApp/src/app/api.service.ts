import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  ping$(): Observable<any> {
    return this.http.get('https://192.168.99.100:5001/api/parkitems/2');
  }

  token$(): Observable<any> {
    return this.http.get('https://192.168.99.100:5001/api/token');
  }

  getUserData$(): Observable<any> {
    return this.http.get('https://192.168.99.100:5001/api/user')
  }

  createtUserData$(): Observable<any> {
    return this.http.post('https://192.168.99.100:5001/api/user',{})
  }

  createSecureURL$(): Observable<any> {
    return this.http.get('https://192.168.99.100:5001/api/pictures/upload/test')
  }

  getSecureURL$(): Observable<any> {
    return this.http.get('https://192.168.99.100:5001/api/pictures/image/test')
  }

  makeBucket$(): Observable<any> {
    return this.http.put('http://192.168.99.100:9444/s3/test',{})
  }

}
