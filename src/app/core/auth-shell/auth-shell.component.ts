import { Component, Input, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-shell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auth-shell.component.html',
  styleUrls: ['./auth-shell.component.css']
})
export class AuthShellComponent implements OnInit, OnDestroy {
  @Input() title = 'Welcome back';
  @Input() subtitle = 'Log in to manage your pet visits';
  @Input() images: string[] = [
    '/images/landing/hero1.jpeg',
    '/images/landing/hero2.jpeg',
    '/images/landing/hero3.jpeg',
    '/images/landing/hero4.jpeg',
    '/images/landing/hero5.jpeg',
    '/images/landing/hero6.jpeg'
  ];

  current = signal(0);
  private timer: any;
  priceOpen = signal(false);

  ngOnInit() {
    this.timer = setInterval(() => {
      const i = this.current();
      this.current.set((i + 1) % this.images.length);
    }, 5000);
  }

  ngOnDestroy() { clearInterval(this.timer); }

  openPrices() { this.priceOpen.set(true); }
  closePrices() { this.priceOpen.set(false); }
}
