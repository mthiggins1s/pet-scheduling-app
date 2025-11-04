import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class GoogleCalendarService {
  private baseUrl = `${environment.apiUrl}/google`;

  constructor(private http: HttpClient) {}

  connect() {
    window.location.href = `${this.baseUrl}/auth`;
  }

  getEvents() {
    return this.http.get(`${this.baseUrl}/events`);
  }

  createTestEvent() {
    return this.http.post(`${this.baseUrl}/test-event`, {});
  }
}
