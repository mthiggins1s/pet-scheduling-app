import { Component, OnInit } from '@angular/core';
import { BookingService } from './booking.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css'],
})
export class BookingListComponent implements OnInit {
  bookings: any[] = [];
  userName: string | null = null;

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    this.userName = localStorage.getItem('username');
    this.bookingService.getAll().subscribe((data: any) => (this.bookings = data));
  }

  delete(id: string) {
    this.bookingService.delete(id).subscribe(() => {
      this.bookings = this.bookings.filter((b) => b._id !== id);
    });
  }
}
