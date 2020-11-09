import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourseReservationComponent } from './add-course-reservation.component';

describe('AddSessionReservationComponent', () => {
  let component: AddCourseReservationComponent;
  let fixture: ComponentFixture<AddCourseReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCourseReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCourseReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
