import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Booking } from './booking.model';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private baseUrl = `${environment.apiUrl}/bookings`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.baseUrl);
  }

  create(booking: Partial<Booking>): Observable<Booking> {
    return this.http.post<Booking>(this.baseUrl, booking);
  }

  update(id: string, booking: Partial<Booking>): Observable<Booking> {
    return this.http.put<Booking>(`${this.baseUrl}/${id}`, booking);
  }

  delete(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/${id}`);
  }
}
