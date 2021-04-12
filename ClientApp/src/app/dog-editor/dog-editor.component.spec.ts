import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogEditorComponent } from './dog-editor.component';

describe('DogEditorComponent', () => {
  let component: DogEditorComponent;
  let fixture: ComponentFixture<DogEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DogEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DogEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
