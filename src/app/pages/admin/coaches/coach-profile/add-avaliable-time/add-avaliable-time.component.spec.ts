import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAvaliableTimeComponent } from './add-avaliable-time.component';

describe('AddAvaliableTimeComponent', () => {
  let component: AddAvaliableTimeComponent;
  let fixture: ComponentFixture<AddAvaliableTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAvaliableTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAvaliableTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
