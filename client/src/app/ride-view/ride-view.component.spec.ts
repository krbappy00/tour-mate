import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideViewComponent } from './ride-view.component';

describe('RideViewComponent', () => {
  let component: RideViewComponent;
  let fixture: ComponentFixture<RideViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RideViewComponent]
    });
    fixture = TestBed.createComponent(RideViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
