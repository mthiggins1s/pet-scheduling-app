import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { AuthShellComponent } from '../../core/auth-shell/auth-shell.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, AuthShellComponent, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    // ✅ build a reactive form
    this.form = this.fb.group({
      username: ['', Validators.required],
      petName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    const { username, petName, password } = this.form.value;
    this.loading = true;

    this.auth.login({ username, petName, password }).subscribe({
      next: (res) => {
        this.auth.saveSession(res.token, res.user.role || 'user');
        this.auth.setUserName(res.user.username);
        alert('✅ Login successful!');
        this.router.navigate(['/bookings']);
      },
      error: (err) => {
        console.error('❌ Login failed:', err);
        alert('❌ ' + (err.error?.message || 'Login failed.'));
      },
      complete: () => (this.loading = false),
    });
  }
}
