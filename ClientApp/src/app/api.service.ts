import { InterceptorService, InterceptorAddAuthenticatoin } from './interceptor.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Environment } from '../environments/environment-variables';
import { Dog } from './models/dog.model';
import { Park } from './models/park.model';
import { UserFullInfo } from './models/user-full-info.model';


const headers = new HttpHeaders().set(InterceptorAddAuthenticatoin,'');

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  api_url: string;

  constructor(private http: HttpClient) {
    this.api_url = Environment.MYAPP_API_URL;
    if(this.isBlank(this.api_url)){
      this.api_url = "https://localhost:5001";
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

  getUserDataById$(id: number): Observable<any> {
    return this.http.get(this.api_url + '/api/user/' + id,{ headers })
  }

  deleteUserDataById$(id: number): Observable<any> {
    return this.http.delete(this.api_url + '/api/user/' + id,{ headers })
  }

  getUserDataByName$(name: string): Observable<any> {
    return this.http.get(this.api_url + '/api/user/name/' + name,{ headers })
  }

  createUserData$(): Observable<any> {
    return this.http.post(this.api_url + '/api/user',{},{ headers })
  }

  addDummyUserData$(): Observable<any> {
    return this.http.post(this.api_url + '/api/user/addDummy',{},{ headers })
  }

  editUserData$(id:number, user:UserFullInfo): Observable<any> {
    return this.http.put(this.api_url + '/api/user/' + id,user,{ headers })
  }

  createSecureURL$(name: string): Observable<any> {
    return this.http.get(this.api_url + '/api/pictures/upload/' + name,{ headers })
  }

  getSecureURL$(): Observable<any> {
    return this.http.get(this.api_url + '/api/pictures/image/test',{ headers })
  }

  createDog$(dog: Dog): Observable<any> {
    return this.http.post(this.api_url + '/api/dogs',dog,{ headers })
  }

  editDog$(dog: Dog): Observable<any> {
    return this.http.put(this.api_url + '/api/dogs',dog,{ headers })
  }

  isBlank(str) {
    return (!str || /^\s*$/.test(str));
  }

  getDogs$( id: number): Observable<any> {
    return this.http.get(this.api_url + '/user/' + id +'/dogs',{ headers })
  }

  getUsersDogs$( id: number): Observable<any> {
    return this.http.get(this.api_url + '/user/' + id +'/dogs',{ headers })
  }

  deleteDog$( id: number): Observable<any> {
    return this.http.delete(this.api_url + '/api/dogs/' + id ,{ headers })
  }

  getDog$( id: number): Observable<any> {
    return this.http.get(this.api_url + '/api/dogs/' + id ,{ headers })
  }

  getImages$(): Observable<any> {
    return this.http.get(this.api_url + '/api/pictures/images',{ headers })
  }

  getUsers$(): Observable<any> {
    return this.http.get(this.api_url + '/api/user/listusers',{ headers })
  }

  getUsersPublic$(): Observable<any> {
    return this.http.get(this.api_url + '/api/user/listusers/public',{ headers })
  }

  getfriends$(): Observable<any> {
    return this.http.get(this.api_url + '/api/user/friends',{ headers })
  }

  addFriend$(id: number): Observable<any> {
    return this.http.post(this.api_url + '/api/user/addFriend/' + id,{},{ headers })
  }

  removeFriend$(id: number): Observable<any> {
    return this.http.delete(this.api_url + '/api/user/removeFriend/' + id,{ headers })
  }

  addFriendToUser$(userId: number, friendId:number): Observable<any> {
    return this.http.post(this.api_url + '/api/user/addFriendToUser/' + userId + '&' + friendId,{},{ headers })
  }

  removeFriendFromUser$(userId: number, friendId:number): Observable<any> {
    return this.http.delete(this.api_url + '/api/user/removeFriendFromUser/' + userId + '&' + friendId,{ headers })
  }

  getParkByName$(park_name: string): Observable<any> {
    return this.http.get(this.api_url + '/api/parkitems/Name/' + park_name,{ headers })
  }

  getParkBySuburb$(park_suburb: string): Observable<any> {
    return this.http.get(this.api_url + '/api/parkitems/suburb/' + park_suburb,{ headers })
  }

  getParkById$(park_id: number): Observable<any> {
    return this.http.get(this.api_url + '/api/parkitems/' + park_id,{ headers })
  }

  getParks$(): Observable<any> {
    return this.http.get(this.api_url + '/api/parkitems/All',{ headers })
  }

  deleteParkById$(park_id: number): Observable<any> {
    return this.http.delete(this.api_url + '/api/parkitems/' + park_id,{ headers })
  }

  createPark$(park:Park): Observable<any> {
    return this.http.post(this.api_url + '/api/ParkItems',park,{ headers })
  }

  updatePark$(park_id:number, park:Park): Observable<any> {
    return this.http.put(this.api_url + '/api/ParkItems/'+ park_id,park,{ headers })
  }



  visitPark$(park_id: number): Observable<any> {
    return this.http.post(this.api_url + '/api/user/parkcheckin/' + park_id,{} ,{ headers })
  }

  leavePark$(): Observable<any> {
    return this.http.delete(this.api_url + '/api/user/leavepark', { headers })
  }

  checkUserInToPark$(userId:number, parkId:number): Observable<any> {
    return this.http.post(this.api_url + '/api/user/parkcheckuserin/' + userId + '&' + parkId,{},{ headers })
  }

  checkUserOutOfPark$(userId:number): Observable<any> {
    return this.http.delete(this.api_url + '/api/user/leavepark/' + userId,{ headers })
  }

}

