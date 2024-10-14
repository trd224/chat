import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormArrayExample2Component } from './form-array-example2.component';

describe('FormArrayExample2Component', () => {
  let component: FormArrayExample2Component;
  let fixture: ComponentFixture<FormArrayExample2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormArrayExample2Component]
    });
    fixture = TestBed.createComponent(FormArrayExample2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
