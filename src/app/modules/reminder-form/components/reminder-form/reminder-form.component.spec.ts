

import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReminderFormComponent } from './reminder-form.component';
import { CalendarService } from 'src/app/services/calendar.service';
import { Reminder } from 'src/app/interfaces/reminder';

// Mock DialogRef
class MatDialogRefMock {
  close(): void {}
}

// Mock CalendarService
class CalendarServiceMock {
  create(reminder: Reminder): void {
    
  }

  edit(reminder: Reminder): void {

  }
}

fdescribe('ReminderFormComponent', () => {
  let component: ReminderFormComponent;
  let fixture: ComponentFixture<ReminderFormComponent>;
  let calendarService: CalendarService;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, BrowserAnimationsModule],
        declarations: [ReminderFormComponent],
        providers: [
          FormBuilder,
          { provide: MatDialogRef, useClass: MatDialogRefMock },
          { provide: MAT_DIALOG_DATA, useValue: {} },
          { provide: CalendarService, useClass: CalendarServiceMock },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderFormComponent);
    component = fixture.componentInstance;
    calendarService = TestBed.inject(CalendarService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it ('should allow text between 0 and 30 char', () => {
    const textControl = component.reminderForm.controls.text;

    textControl.setValue(null);

    expect(textControl.invalid).toBeTruthy();    

    textControl.setValue('hello world!');
    expect(textControl.valid).toBeTruthy();    

    textControl.setValue('This is a text of 31 characters');
    expect(textControl.invalid).toBeTruthy();    

  });

  it("shouldn't add a reminder if text is more than 30 char", () => {
    const createSpy = spyOn(calendarService, 'create').and.callThrough(); // Mock the create method

    // Set form values
    component.reminderForm.setValue({
      text: 'This is a text of 31 characters',
      dateTime: new Date('2023-12-01T14:30:00'),
      color: '#FF836D',
      city: 'New York',
      id: null,
    });

    // Trigger submitForm
    component.submitForm();

    // // Verify that the create method was called with the correct values
    expect(createSpy).not.toHaveBeenCalled()
  })

  it('should add a reminder', () => {
    const createSpy = spyOn(calendarService, 'create').and.callThrough(); // Mock the create method

    // Set form values
    component.reminderForm.setValue({
      text: 'Meeting',
      dateTime: new Date('2023-12-01T14:30:00'),
      color: '#FF836D',
      city: 'New York',
      id: null,
    });

    // Trigger submitForm
    component.submitForm();

    // // Verify that the create method was called with the correct values
    expect(createSpy).toHaveBeenCalledWith({
      text: 'Meeting',
      dateTime: new Date('2023-12-01T14:30:00'),
      color: '#FF836D',
      city: 'New York',
      id: null,
    });
  });
});