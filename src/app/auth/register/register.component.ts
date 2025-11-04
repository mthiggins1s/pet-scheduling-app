import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AuthShellComponent } from '../../core/auth-shell/auth-shell.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AuthShellComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      petName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    const { username, petName, password } = this.form.value;
    this.loading = true;

    this.auth.register(username, petName, password).subscribe({
      next: () => {
        alert('✅ Registration successful!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('❌ Registration failed:', err);
        alert('❌ ' + (err.error?.message || 'Registration failed.'));
      },
      complete: () => (this.loading = false)
    });
  }
}
