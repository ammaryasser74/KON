import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachReportComponent } from './coach-report.component';

describe('CoachReportComponent', () => {
  let component: CoachReportComponent;
  let fixture: ComponentFixture<CoachReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoachReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
