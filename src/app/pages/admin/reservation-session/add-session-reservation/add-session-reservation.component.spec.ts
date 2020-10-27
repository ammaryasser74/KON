import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSessionReservationComponent } from './add-session-reservation.component';

describe('AddSessionReservationComponent', () => {
  let component: AddSessionReservationComponent;
  let fixture: ComponentFixture<AddSessionReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSessionReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSessionReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
