import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationCourseComponent } from './reservation-course.component';

describe('ReservationSessionComponent', () => {
  let component: ReservationCourseComponent;
  let fixture: ComponentFixture<ReservationCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
