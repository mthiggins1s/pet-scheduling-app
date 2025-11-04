import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthShellComponent } from '../../core/auth-shell/auth-shell.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, AuthShellComponent, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form = { fullName: '', petName: '', password: '' };

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
  this.auth.login(this.form).subscribe({
    next: (res) => {
      const firstName = this.form.fullName.split(' ')[0];
      this.auth.setUserName(firstName);
      this.router.navigate(['/bookings']);
    },
    error: (err) => alert(err.error.message || 'Invalid credentials.'),
  });
  }
}
