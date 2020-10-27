import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventReservationReportComponent } from './event-reservation-report.component';

describe('EventReservationReportComponent', () => {
  let component: EventReservationReportComponent;
  let fixture: ComponentFixture<EventReservationReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventReservationReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventReservationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
