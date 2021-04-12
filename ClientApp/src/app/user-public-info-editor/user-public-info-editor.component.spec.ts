import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPublicInfoEditorComponent } from './user-public-info-editor.component';

describe('UserPublicInfoEditorComponent', () => {
  let component: UserPublicInfoEditorComponent;
  let fixture: ComponentFixture<UserPublicInfoEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPublicInfoEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPublicInfoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
