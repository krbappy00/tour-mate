import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrideComponent } from './addride.component';

describe('AddrideComponent', () => {
  let component: AddrideComponent;
  let fixture: ComponentFixture<AddrideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddrideComponent]
    });
    fixture = TestBed.createComponent(AddrideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
