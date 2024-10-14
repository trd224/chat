import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormArrayExample1Component } from './form-array-example1.component';

describe('FormArrayExample1Component', () => {
  let component: FormArrayExample1Component;
  let fixture: ComponentFixture<FormArrayExample1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormArrayExample1Component]
    });
    fixture = TestBed.createComponent(FormArrayExample1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
