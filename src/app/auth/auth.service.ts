import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = `${environment.apiUrl}/auth`;
  isLoggedIn = signal(false);
  userRole = signal<string | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('token');
    if (token) this.isLoggedIn.set(true);
  }

  register(data: any) {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  login(credentials: any) {
    return this.http.post<{ token: string; user: any }>(`${this.baseUrl}/login`, credentials);
  }

  saveSession(token: string, role: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    this.isLoggedIn.set(true);
    this.userRole.set(role);
  }

  logout() {
    localStorage.clear();
    this.isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
