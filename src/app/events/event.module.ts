import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction';
import { EventService } from "src/services/event.service";
import { EventComponent } from './event.component'

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [

  ],
  imports: [
    FormsModule,
    CommonModule,
    FullCalendarModule
  ],
  exports: [],
  providers: [],
  entryComponents: []
})

export class EventModule { }