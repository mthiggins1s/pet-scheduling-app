import { Component } from '@angular/core';
import { BookingService } from '../booking.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent {
  form = { date: '', times: '', numVisits: 1 };

  constructor(private bookingService: BookingService, private router: Router) {}

  onSubmit() {
    const payload = { ...this.form, times: [this.form.times] };
    this.bookingService.create(payload).subscribe({
      next: () => this.router.navigate(['/bookings']),
      error: (err) => alert(err.error.message)
    });
  }
}
