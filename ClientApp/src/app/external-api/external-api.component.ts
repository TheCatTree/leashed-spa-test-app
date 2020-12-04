import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { dog } from '../models/dog';
import { UploadService } from '../services/upload.service';

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
  secureURL: string;
  bucketCreation: string;
  selectedFiles: FileList;
  doglistJson: string;
  userId: number;
  createdDog: dog;

  saveDog: dog = {
    Id: null,
    UserDataId: null,
    name: null,
    pictures: null
    }

  constructor(private api: ApiService, private uploadService: UploadService) { }

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

  secureURLCreate(){
    this.api.createSecureURL$().subscribe(
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
      res => this.doglistJson = res
    );
  }

  addUsersDogs(){
    this.saveDog.UserDataId = this.userId;
    this.api.createDog$(this.saveDog).subscribe(
      res => this.createdDog = res
    );
  }

  upload() {
    const file = this.selectedFiles.item(0);
    this.uploadService.uploadFile(file);
    }

    selectFile(event) {
      this.selectedFiles = event.target.files;
      }

}
