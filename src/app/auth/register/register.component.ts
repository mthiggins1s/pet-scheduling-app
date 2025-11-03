import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthShellComponent } from '../../core/auth-shell/auth-shell.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, AuthShellComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form = { fullName: '', petName: '', password: '' };

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
  this.auth.register(this.form).subscribe({
    next: () => {
      const firstName = this.form.fullName.split(' ')[0];
      this.auth.setUserName(firstName);
      alert('✅ Account created! Please login.');
      this.router.navigate(['/login']);
    },
    error: (err) => alert(err.error.message || 'Registration failed.'),
  });
}

}
