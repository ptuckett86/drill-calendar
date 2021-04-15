import { Component, OnInit, ViewChild } from '@angular/core';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventService } from 'src/services/event.service';

@Component({
    selector: 'app-event',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.css'],

})
export class EventComponent implements OnInit {
    @ViewChild('calendar', { static: true }) calendarComponent: FullCalendarComponent;
    selectedEvent: object;
    eventSelected = false;
    eventDetails = [];

    constructor(private eventService: EventService) { }
    calendarOptions = {
        plugins: [dayGridPlugin, timeGrigPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        events: []
    };

    ngOnInit(): void {
        this.eventService.getEvents().subscribe(data => {
            this.getCalendarEvents(data);
        });
    }

    getCalendarEvents(data) {
        if (data) {
            let events = []
            for (let value of Object.values(data["results"])) {
                events.push({ title: value["name"], start: value["dt_start"], end: value["dt_end"] })
                this.eventDetails.push({ "uuid": value["uuid"] })
                this.calendarOptions.events = events
            }
            console.log(this.calendarOptions.events)
        }
    }
    // handleEventClick(data) {
    //     this.selectedEvent = data.event._def.extendedProps.uuid;
    //     this.eventSelected = true;
    //     let event = this.eventDetails.find(x => x.uuid == this.selectedEvent)
    //     const dialogRef = this.dialog.open(EventDetailModalComponent, {
    //         width: '600px',
    //         height: '400px',
    //         data: {
    //             ...event
    //         }
    //     })
    //     dialogRef.afterClosed().pipe().subscribe(
    //         (res) => {
    //             if (res) {
    //                 this.getCalendarEvents(data);
    //             } else { console.log("Closed Without Changes") }
    //         })
    // }
}