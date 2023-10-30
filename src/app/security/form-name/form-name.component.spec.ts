import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNameComponent } from './form-name.component';

describe('FormNameComponent', () => {
  let component: FormNameComponent;
  let fixture: ComponentFixture<FormNameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormNameComponent]
    });
    fixture = TestBed.createComponent(FormNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
