import { ImagesService } from './../images.service';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { dog, User } from '../models/dog';
import { UploadService } from '../services/upload.service';
import { Json } from 'aws-sdk/clients/robomaker';
import { secureURL } from '../models/secureURLResource';

@Component({
  selector: 'app-external-api',
  templateUrl: './external-api.component.html',
  styleUrls: ['./external-api.component.css']
})
export class ExternalApiComponent implements OnInit {
  responseJson: string;
  tokenJson: string;
  userData: string;
  userDataCreationResponse: string;
  userDataExists: boolean;
  secureURL: secureURL;
  images :secureURL[];
  sizeofimages: number;
  bucketCreation: string;
  selectedFiles: FileList;
  doglistJson: string;
  userId: number;
  createdDog: dog;
  queryResult: any = {};
  users: User[];
  friend: number;
  friendsResult: User[];

  saveDog: dog = {
    Id: null,
    UserDataId: null,
    name: null,
    }

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

  createUserData() {
    this.api.createtUserData$().subscribe(
      res => this.userDataCreationResponse = res
    );
  }

  secureURLCreateNoName(){
    this.secureURLCreate("giberish");
  }
  secureURLCreate(name: string){
    this.api.createSecureURL$(name).subscribe(
      res => this.secureURL = res
    );
  }

  secureURLGet(){
    this.api.getSecureURL$().subscribe(
      res => this.secureURL = res
    );
  }

  getUsersDogs(){
    this.api.getDogs$(this.userId).subscribe(
      res => {this.queryResult = res;
        console.log("------------queryReults-------------");
        console.log(this.queryResult)
      }
    );
  }

  addUsersDogs(){
    var outDog = this.saveDog;
    outDog.Id = 99;
    outDog.UserDataId = this.userId;
    this.api.createDog$(outDog).subscribe(
      res => this.createdDog = res
    );

  }

  upload() {
    const file = this.selectedFiles.item(0);

    this.api.createSecureURL$(file.name).subscribe(
      res => {this.secureURL = res
        this.imagesService.uploadImage$(file,this.secureURL.url).subscribe(
          res => console.log(res)
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
          res => this.friendsResult = res
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

}
