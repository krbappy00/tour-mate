import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiderProfileComponent } from './rider-profile.component';

describe('RiderProfileComponent', () => {
  let component: RiderProfileComponent;
  let fixture: ComponentFixture<RiderProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RiderProfileComponent]
    });
    fixture = TestBed.createComponent(RiderProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
