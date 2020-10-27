import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationSessionComponent } from './reservation-session.component';

describe('ReservationSessionComponent', () => {
  let component: ReservationSessionComponent;
  let fixture: ComponentFixture<ReservationSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
