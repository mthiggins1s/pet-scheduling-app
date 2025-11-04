import { Component, OnInit } from '@angular/core';
import { GoogleCalendarService } from '../../services/google-calendar.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  events: any[] = [];
  loading = false;

  constructor(private googleService: GoogleCalendarService) {}

  ngOnInit() {
    this.loadEvents();
  }

  connectGoogle() {
    this.googleService.connect();
  }

  loadEvents() {
    this.loading = true;
    this.googleService.getEvents().subscribe({
      next: (res: any) => {
        this.events = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Error loading events:', err);
        this.loading = false;
      }
    });
  }

  createEvent() {
    this.googleService.createTestEvent().subscribe({
      next: (res: any) => alert(`✅ Event created! Link: ${res.eventLink}`),
      error: (err) => console.error('❌ Error creating event:', err)
    });
  }
}
