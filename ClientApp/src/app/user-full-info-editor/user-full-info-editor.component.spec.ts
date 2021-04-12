import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFullInfoEditorComponent } from './user-full-info-editor.component';

describe('UserFullInfoEditorComponent', () => {
  let component: UserFullInfoEditorComponent;
  let fixture: ComponentFixture<UserFullInfoEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFullInfoEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFullInfoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
