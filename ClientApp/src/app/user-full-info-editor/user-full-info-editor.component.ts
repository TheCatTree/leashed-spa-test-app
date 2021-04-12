import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {  UserFullInfo } from "../models/user-full-info.model";


@Component({
  selector: 'app-user-full-info-editor',
  templateUrl: './user-full-info-editor.component.html',
  styleUrls: ['./user-full-info-editor.component.css']
})
export class UserFullInfoEditorComponent {

  @Input() input: UserFullInfo = {
    id: 0,
    name: null,
    tokenSub: null,
    dogs: [],
    friends: [],
    privacyLevel: null,
    park: null,
  };

  @Output() output = new EventEmitter<UserFullInfo>();

  userFullInfoForm = this.fb.group({
    Name: ['Default'],
    TokenSub:['Default'],
    PrivacyLevel:['Default'],
    Park:[0]
  });
  constructor(private fb: FormBuilder) { }

  onSubmit(){
    this.input.name = this.userFullInfoForm.get('Name').value;
    this.input.tokenSub = this.userFullInfoForm.get('TokenSub').value;
    this.input.privacyLevel = this.userFullInfoForm.get('PrivacyLevel').value;
    this.input.park = this.userFullInfoForm.get('Park').value;

    this.output.emit(this.input);
  }

  ngOnChanges(changes: SimpleChanges){
    console.log("user full editor change detected");
   if(changes.input){
    console.log("user full editor change on input");
    if(!changes.input.firstChange){
      console.log("user full editor change not first");
      this.userFullInfoForm.patchValue({
        Name: this.input.name,
        TokenSub: this.input.tokenSub,
        PrivacyLevel: this.input.privacyLevel,
        Park: this.input.park,
        });
    }
   }
  }

}
