import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { routing } from './app.router';
import { SharedModule } from './shared/shared.module';
import { HomeService } from './home/home.service';
import { TaskService } from './task/task.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    HomeService,
    TaskService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
