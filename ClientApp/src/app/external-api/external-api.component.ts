import { UserFullInfo } from './../models/user-full-info.model';
import { FormGroup } from '@angular/forms';
import { ImagesService } from './../images.service';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Dog } from '../models/dog.model';
import { UserPublicInfo } from "../models/user-public-info.model";
import { Park } from '../models/park.model';
import { UploadService } from '../services/upload.service';
import { Json } from 'aws-sdk/clients/robomaker';
import { SecureURL } from '../models/secure-url.model';


@Component({
  selector: 'app-external-api',
  templateUrl: './external-api.component.html',
  styleUrls: ['./external-api.component.css']
})
export class ExternalApiComponent implements OnInit {
  responseJson: string;
  tokenJson: string;

  userData: string;
  userToEdit = <UserFullInfo>{};
  userToAdd = <UserFullInfo>{};
  FriendData: UserFullInfo;
  userDataCreationResponse: string;
  userDataExists: boolean;
  userDataAll: Array<UserFullInfo>;
  userDataPublicAll: Array<UserPublicInfo>;
  userDogs: Array<Dog>;
  user = <UserFullInfo>{};
  dog = <Dog>{};


  secureURL: SecureURL;
  images :SecureURL[];
  sizeofimages: number;
  bucketCreation: string;
  selectedFiles: FileList;
  doglistJson: string;
  userId: number;
  createdDog: Dog;
  queryResult: any = {};
  users: UserPublicInfo[];
  friend: number;
  friendsResult: UserPublicInfo[];
  parksDataAll: Array<Park>;
  parkSuburb: Array<Park>;
  parkData: Park = {
    id: 0,
    name: null,
    isLeashed: null,
    roadFront: null,
    suburb:null,
    city:null,
    country:null,
    parkGoers: []

  };
  parkToAdd: Park = {
    id: 0,
    name: null,
    isLeashed: null,
    roadFront: null,
    suburb:null,
    city:null,
    country:null,
    parkGoers: []

  };
  parkToModify: Park = {
    id: 0,
    name: "bobo",
    isLeashed: null,
    roadFront: null,
    suburb:null,
    city:null,
    country:null,
    parkGoers: []

  };

  saveDog: Dog = {
    id: null,
    userDataId: null,
    name: null,
    }
  parkForm : FormGroup;

  constructor(private api: ApiService, private uploadService: UploadService, private imagesService: ImagesService) { }

  ngOnInit() {
    this.userDataExists = false;
  }

  pingApi() {
    this.api.ping$().subscribe(
      res => this.responseJson = res
    );
  }

  tokenApi() {
    this.api.token$().subscribe(
      res => this.tokenJson = res
    );
  }

  testForUserData() {
    this.getUserData();
    console.log(this.userData);
    this.createUserData();
    console.log(this.userDataCreationResponse);
    this.getUserData();
    console.log(this.userData);
  }

  getUserData() {
    this.api.getUserData$().subscribe(
      res => {
        this.userData = res;
        //var obj = JSON.parse(res)
        this.userId = res.id;
        console.log("the user ID is", this.userData);

      }
    );
  }

  getUserDataById(id:number) {
    this.api.getUserDataById$(id).subscribe(
      res => {
        this.userData = res;
        //var obj = JSON.parse(res)
        this.userId = res.id;
        console.log("the user ID is", this.userData);

      }
    );
  }

  getUserDataByName(name:string) {
    this.api.getUserDataByName$(name).subscribe(
      res => {
        this.userData = res;
        //var obj = JSON.parse(res)
        this.userId = res.id;
        console.log("the user ID is", this.userData);

      }
    );
  }

  createUserData() {
    this.api.createUserData$().subscribe(
      res => {
        this.userDataCreationResponse = res;
        this.userData = res;
      }
    );
  }

  addDummyUser() {
    this.api.addDummyUserData$().subscribe(
      res => {
        this.userDataCreationResponse = res;
        this.userData = res;
      }
    );
  }


  secureURLCreate(name: string){
    this.api.createSecureURL$(name).subscribe(
      res => this.secureURL = res
    );
  }

  secureURLCreateNoName(){
    this.secureURLCreate("giberish");
  }

  secureURLGet(){
    this.api.getSecureURL$().subscribe(
      res => this.secureURL = res
    );
  }

  getUsersDogs(){
    this.api.getDogs$(this.user.id).subscribe(
      res => {this.queryResult = res;
        console.log("------------queryReults-------------");
        console.log(this.queryResult)
      }
    );
  }

  addUsersDogs(){
    var outDog = this.saveDog;
    outDog.id = 99;
    outDog.userDataId = this.userId;
    this.api.createDog$(outDog).subscribe(
      res => this.createdDog = res
    );

  }

  upload() {
    const file = this.selectedFiles.item(0);

    this.api.createSecureURL$(file.name).subscribe(
      res => {this.secureURL = res
        this.imagesService.uploadImage$(file,this.secureURL.url).subscribe(
          res => console.log("upload function response" + JSON.stringify(res))
        );
      }
    );

    }

    selectFile(event) {
      this.selectedFiles = event.target.files;
      }

      addFriend(){
        this.api.addFriend$(this.friend).subscribe(
        )
      }

      getUsersfriends(){
        this.api.getfriends$().subscribe(
          res =>{
            this.friendsResult = res;
            console.log("getUsersfriends Response" + JSON.stringify(res));
            this.responseJson = res;
          }
        );
      }

      getUsers(){
        this.api.getUsers$().subscribe(
          res => this.users = res
        );
      }

  updateImageList() {
    this.api.getImages$().subscribe(
      res => {this.images = res;
        this.sizeofimages = this.images.length;

      }
        );
  }

  getAllParks(){
    this.api.getParks$().subscribe(
      res => this.parksDataAll = res
    );
  }

  getParkByName(name:string){
      this.api.getParkByName$(name).subscribe(
        res => this.parkData = res
      );
  }

  getParkById(id:number){
    this.api.getParkById$(id).subscribe(
      res => this.parkData = res
    );
  }

  getParkByIdTest(park:Park,id:number){
    this.api.getParkById$(id).subscribe(
      res => park = res
    );
  }

  getParkByIdToModify(id:number){
    this.api.getParkById$(id).subscribe(
      res => this.parkToModify = res
    );
  }

  getParkByNameToModify(name:string){
    this.api.getParkByName$(name).subscribe(
      res => this.parkToModify = res
    );
}

  getParkBySuburb(suburb:string){
    this.api.getParkBySuburb$(suburb).subscribe(
      res => this.parkSuburb = res
    );
  }

  deletePark(id:number){
    this.api.deleteParkById$(id).subscribe(
      res => this.parkData = res
    );
  }

  modifyPark(){
    this.api.updatePark$(this.parkToModify.id,this.parkToModify).subscribe(
     // res => this.parkToModify = res
    );
  }

  addPark(){
      this.api.createPark$(this.parkToAdd).subscribe(
        res => this.parkToAdd = res
      );
  }

  addParkEvent(park:Park){
    this.parkToAdd = park;
    this.addPark();
  }

  modifyParkEvent(park:Park){
    this.parkToModify = park;
    this.modifyPark();
  }

  selectUserbyId(id:number , user:UserFullInfo){
    this.api.getUserDataById$(id).subscribe(
      res => {
        console.log("Response from SelectUserbyId:" + JSON.stringify(res));
        Object.assign(user, res);
        console.log("what user is:" + user.tokenSub);
        console.log("what userToEdit is:" + this.userToEdit.tokenSub);
      }
    );
  }
  selectUserbyIdToEdit(id: number){
    //this.selectUserbyId(id, this.userToEdit);
    this.api.getUserDataById$(id).subscribe(
      res => {
        this.userToEdit = res;
      }
    );

  }

  selectUserbyIdForDogEditor(id: number){
    //this.selectUserbyId(id, this.user);
    this.api.getUserDataById$(id).subscribe(
      res => {
        this.user = res;
      }
    );

  }

  modifyUser(user:UserFullInfo){
    this.userToEdit = user;
    this.api.editUserData$(user.id,user).subscribe(
      res => this.userToEdit = res
    );
  }

  getAllUserData(){
    this.api.getUsers$().subscribe(
      res => this.userDataAll = res
    );
  }

  getAllPublicUserData(){
    this.api.getUsersPublic$().subscribe(
      res => this.userDataPublicAll = res
    );
  }

  deleteUser(id:number){
    this.api.deleteUserDataById$(id).subscribe(
      res => this.userData = res
    );
  }

  addFriendById(id:number){
    this.api.addFriend$(id).subscribe(
      res => this.userData = res
    );
  }

  addFriendToUserByIds(userId:number, FriendId:number){
    this.api.addFriendToUser$(userId,FriendId).subscribe(
      res => this.userData = res
    );
  }

  removeFriendById(id:number){
    this.api.removeFriend$(id).subscribe(
      res => this.userData = res
    );
  }

  removeFriendFromUserByIds(userId:number, FriendId:number){
    this.api.removeFriendFromUser$(userId,FriendId).subscribe(
      res => this.userData = res
    );
  }

  checkInToParkById(id:number){
    this.api.visitPark$(id).subscribe(
      res => this.userData = res
    );
  }

  leavePark(){
    this.api.leavePark$().subscribe(
      res => this.userData = res
    );
  }

  checkUserIntoParkByIds(userId:number, FriendId:number){
    this.api.checkUserInToPark$(userId,FriendId).subscribe(
      res => this.userData = res
    );
  }

  checkUserOutOfPark(userId:number){
    this.api.checkUserOutOfPark$(userId).subscribe(
      res => this.userData = res
    );
  }

  getUsersDogsById(id:number){
    this.api.getUsersDogs$(id).subscribe(
      res => this.userDogs = res
    );
  }

  deleteDogById(id:number){
    this.api.deleteDog$(id).subscribe(
      res => this.userDogs
    );
  }

  addDog(dog:Dog){
    this.api.createDog$(dog).subscribe(
      res => this.dog = res
    );
  }

  editDog(dog:Dog){
    this.api.editDog$(dog).subscribe(
      res => this.dog = res
    );
  }

  getDogById(id:number){
    this.api.getDog$(id).subscribe(
      res => this.dog = res
    );
  }



}
