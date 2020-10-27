import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionReservationReportComponent } from './session-reservation-report.component';

describe('SessionReservationReportComponent', () => {
  let component: SessionReservationReportComponent;
  let fixture: ComponentFixture<SessionReservationReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionReservationReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionReservationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
