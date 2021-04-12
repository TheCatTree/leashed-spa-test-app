import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {  PictureInfo } from "../models/picture-info.model";

@Component({
  selector: 'app-picture-info-editor',
  templateUrl: './picture-info-editor.component.html',
  styleUrls: ['./picture-info-editor.component.css']
})
export class PictureInfoEditorComponent {

  @Input() input: PictureInfo = {
    id: 0,
    key: null,
    isPublic: null,
    fileName: null,
    dogsInpicture: [],
    canRead: [],
    canEdit: [],
    ownerId: null
  };

  @Output() output = new EventEmitter<PictureInfo>();

  pictureInfoForm = this.fb.group({
    Key: ['Default'],
    IsPublic: [false],
    FileName: ['Default'],
    OwnerId: [0]
  });
  constructor(private fb: FormBuilder) { }

  onSubmit(){
    this.input.key = this.pictureInfoForm.get('Key').value;
    this.input.fileName = this.pictureInfoForm.get('FileName').value;
    this.input.ownerId = this.pictureInfoForm.get('OwnerId').value;
    this.input.isPublic = this.pictureInfoForm.get('IsPublic').value;
    this.output.emit(this.input);
  }

  ngOnChanges(changes: SimpleChanges){
   if(changes.input){
    if(!changes.input.firstChange){
      this.pictureInfoForm.patchValue({
        Key: this.input.key,
        IsPublic: this.input.isPublic,
        FileName: this.input.fileName,
        OwnerId: this.input.ownerId
        });
    }
   }
  }

}
