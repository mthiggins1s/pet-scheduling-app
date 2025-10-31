import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form = { fullName: '', petName: '', password: '' };

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.auth.login(this.form).subscribe({
      next: (res: any) => {
        this.auth.saveSession(res.token, res.user.role);
        this.router.navigate(['/bookings']);
      },
      error: (err) => alert(err.error.message)
    });
  }
}
