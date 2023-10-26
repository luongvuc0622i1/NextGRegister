import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInWithPhoneComponent } from './sign-in-with-phone.component';

describe('SignInWithPhoneComponent', () => {
  let component: SignInWithPhoneComponent;
  let fixture: ComponentFixture<SignInWithPhoneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignInWithPhoneComponent]
    });
    fixture = TestBed.createComponent(SignInWithPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
