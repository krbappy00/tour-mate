import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThankYouPageComponent } from './thank-you-page.component';

describe('ThankYouPageComponent', () => {
  let component: ThankYouPageComponent;
  let fixture: ComponentFixture<ThankYouPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThankYouPageComponent]
    });
    fixture = TestBed.createComponent(ThankYouPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
