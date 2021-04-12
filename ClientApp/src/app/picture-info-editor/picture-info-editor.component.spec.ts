import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureInfoEditorComponent } from './picture-info-editor.component';

describe('PictureInfoEditorComponent', () => {
  let component: PictureInfoEditorComponent;
  let fixture: ComponentFixture<PictureInfoEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PictureInfoEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureInfoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
