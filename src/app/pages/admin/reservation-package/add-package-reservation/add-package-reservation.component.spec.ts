import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPackageReservationComponent } from './add-package-reservation.component';

describe('AddPackageReservationComponent', () => {
  let component: AddPackageReservationComponent;
  let fixture: ComponentFixture<AddPackageReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPackageReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPackageReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
