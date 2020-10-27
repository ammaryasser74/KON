import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAdminProfileComponent } from './show-admin-profile.component';

describe('ShowAdminProfileComponent', () => {
  let component: ShowAdminProfileComponent;
  let fixture: ComponentFixture<ShowAdminProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowAdminProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAdminProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
