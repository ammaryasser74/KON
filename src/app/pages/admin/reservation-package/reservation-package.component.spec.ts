import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationPackageComponent } from './reservation-package.component';

describe('ReservationPackageComponent', () => {
  let component: ReservationPackageComponent;
  let fixture: ComponentFixture<ReservationPackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
