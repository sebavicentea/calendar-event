import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderNotificationComponent } from './reminder-notification.component';

describe('ReminderNotificationComponent', () => {
  let component: ReminderNotificationComponent;
  let fixture: ComponentFixture<ReminderNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReminderNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
