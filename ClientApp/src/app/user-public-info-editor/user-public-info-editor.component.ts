import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {  UserPublicInfo } from "../models/user-public-info.model";


@Component({
  selector: 'app-user-public-info-editor',
  templateUrl: './user-public-info-editor.component.html',
  styleUrls: ['./user-public-info-editor.component.css']
})
export class UserPublicInfoEditorComponent {

  @Input() input: UserPublicInfo = {
    id: 0,
    name: null,
  };

  @Output() output = new EventEmitter<UserPublicInfo>();

  userPublicInfoForm = this.fb.group({
    Name: ['Default']
  });
  constructor(private fb: FormBuilder) { }

  onSubmit(){
    this.input.name = this.userPublicInfoForm.get('Name').value;
    this.output.emit(this.input);
  }

  ngOnChanges(changes: SimpleChanges){
   if(changes.input){
    if(!changes.input.firstChange){
      this.userPublicInfoForm.patchValue({
        Name: this.input.name
        });
    }
   }
  }

}
