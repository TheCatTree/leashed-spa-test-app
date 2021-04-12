import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {  Dog } from "../models/dog.model";


@Component({
  selector: 'app-dog-editor',
  templateUrl: './dog-editor.component.html',
  styleUrls: ['./dog-editor.component.css']
})
export class DogEditorComponent {

  @Input() input: Dog = {
    id: 0,
    name: null,
    userDataId: null
  };

  @Output() output = new EventEmitter<Dog>();

  dogForm = this.fb.group({
    Name: ['Default'],
    OwnerId: [0]
  });
  constructor(private fb: FormBuilder) { }

  onSubmit(){
    this.input.name = this.dogForm.get('Name').value;
    this.input.userDataId = this.dogForm.get('OwnerId').value;
    this.output.emit(this.input);
  }

  ngOnChanges(changes: SimpleChanges){
   if(changes.input){
    if(!changes.input.firstChange){
      this.dogForm.patchValue({
        Name: this.input.name,
        OwnerId: this.input.userDataId
        });
    }
   }
  }

}
