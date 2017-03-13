import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { TaskComponent } from './task.component';
import { routing } from './task.router';
import { ProgressbarModule } from 'ng2-bootstrap/progressbar';
import { ButtonsModule } from 'ng2-bootstrap/buttons';

@NgModule({
  imports: [
    ProgressbarModule.forRoot(),
    ButtonsModule.forRoot(),
    CommonModule,
    SharedModule,
    routing,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    TaskComponent
  ],
  bootstrap: [
    TaskComponent
  ]
})
export class TaskModule { }
