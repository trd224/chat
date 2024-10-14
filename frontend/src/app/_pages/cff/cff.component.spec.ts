import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CffComponent } from './cff.component';

describe('CffComponent', () => {
  let component: CffComponent;
  let fixture: ComponentFixture<CffComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CffComponent]
    });
    fixture = TestBed.createComponent(CffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
