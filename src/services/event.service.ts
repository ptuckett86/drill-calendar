import { Injectable } from '@angular/core';
import { ApiService } from './api.service';


@Injectable()
export class EventService {
    private eventUrl = 'events/';
    constructor(private apiService: ApiService) { }

    getEvents() {
        let data = this.apiService.get(this.eventUrl)
        return data

    }
}
