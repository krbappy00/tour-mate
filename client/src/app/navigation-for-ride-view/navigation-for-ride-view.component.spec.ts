import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationForRideViewComponent } from './navigation-for-ride-view.component';

describe('NavigationForRideViewComponent', () => {
  let component: NavigationForRideViewComponent;
  let fixture: ComponentFixture<NavigationForRideViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavigationForRideViewComponent]
    });
    fixture = TestBed.createComponent(NavigationForRideViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
