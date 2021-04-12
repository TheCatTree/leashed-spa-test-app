import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkEditorComponent } from './park-editor.component';

describe('ParkEditorComponent', () => {
  let component: ParkEditorComponent;
  let fixture: ComponentFixture<ParkEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParkEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
