import { Component, OnInit ,OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Park } from '../models/park.model';
@Component({
  selector: 'app-park-editor',
  templateUrl: './park-editor.component.html',
  styleUrls: ['./park-editor.component.css']
})
export class ParkEditorComponent {
  @Input() input: Park = {
    id: 0,
    name: null,
    isLeashed: null,
    roadFront: null,
    suburb:null,
    city:null,
    country:null,
    parkGoers: []
  };

  @Output() output = new EventEmitter<Park>();

  parkForm = this.fb.group({
    Name: ['default'],
    IsLeashed:['default'],
    RoadFront:[false],
    Suburb:['default'],
    City:['default'],
    Country:['default'],
  });

  changesDetected: number = 0;
  name:string = 'Start';

  onSubmit(){
    this.input.name = this.parkForm.get('Name').value;
    this.input.isLeashed = this.parkForm.get('IsLeashed').value;
    this.input.roadFront = this.parkForm.get('RoadFront').value;
    this.input.suburb = this.parkForm.get('Suburb').value;
    this.input.city = this.parkForm.get('City').value;
    this.input.country = this.parkForm.get('Country').value;
    this.output.emit(this.input);
  }

  ngOnChanges(changes: SimpleChanges){
   if(changes.input){
    if(!changes.input.firstChange){
      this.parkForm.patchValue({
        Name: this.input.name,
        IsLeashed: this.input.isLeashed,
        RoadFront: this.input.roadFront,
        Suburb: this.input.suburb,
        City: this.input.city,
        Country:this.input.country,
        });
        this.changesDetected = this.changesDetected + 1;
        this.name = this.input.name.toString();
        console.log("name is", this.name);
        console.log("park", this.input);
    }
   }



  }

  constructor(private fb: FormBuilder) {}



}
