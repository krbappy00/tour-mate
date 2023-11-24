import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideDetailsFormComponent } from './ride-details-form.component';

describe('RideDetailsFormComponent', () => {
  let component: RideDetailsFormComponent;
  let fixture: ComponentFixture<RideDetailsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RideDetailsFormComponent]
    });
    fixture = TestBed.createComponent(RideDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
