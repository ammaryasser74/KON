import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEventReservationComponent } from './add-event-reservation.component';

describe('AddEventReservationComponent', () => {
  let component: AddEventReservationComponent;
  let fixture: ComponentFixture<AddEventReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEventReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEventReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
