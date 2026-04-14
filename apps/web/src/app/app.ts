import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { APP_RUNTIME_CONFIG } from './core/config/runtime-config';
import { AuthService } from './core/services/auth';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly config = inject(APP_RUNTIME_CONFIG);

  readonly session = this.authService.session;
  readonly authEnabled = this.config.authEnabled;

  constructor() {
    if (!this.authEnabled) {
      this.authService.ensureDemoSession();
    }
  }

  logout(): void {
    this.authService.logout();
    void this.router.navigateByUrl(this.authEnabled ? '/login' : '/spectacles');
  }
}
