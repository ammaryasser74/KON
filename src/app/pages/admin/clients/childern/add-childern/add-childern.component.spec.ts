import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChildernComponent } from './add-childern.component';

describe('AddChildernComponent', () => {
  let component: AddChildernComponent;
  let fixture: ComponentFixture<AddChildernComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddChildernComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChildernComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
