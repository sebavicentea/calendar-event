import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReminderFormComponent } from './components/reminder-form/reminder-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [ReminderFormComponent],
  exports: [ReminderFormComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule
  ]
})
export class ReminderFormModule { }
