import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { BookingListComponent } from './booking/booking-list/booking-list.component';
import { BookingFormComponent } from './booking/booking-list/booking-form/booking-form.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'bookings', component: BookingListComponent, canActivate: [authGuard] },
  { path: 'bookings/new', component: BookingFormComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'login' }
];
