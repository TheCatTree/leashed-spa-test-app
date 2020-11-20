import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LoginorsignupComponent } from './loginorsignup.component';

describe('LoginorsignupComponent', () => {
  let component: LoginorsignupComponent;
  let fixture: ComponentFixture<LoginorsignupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginorsignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginorsignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
