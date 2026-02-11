import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  isSubmitting = false;

  constructor(private auth: AuthService, private router: Router) {}

  login(): void {
    this.error = '';

    const email = this.email.trim();
    const password = this.password;

    if (!email || !password.trim()) {
      this.error = 'Veuillez renseigner un email et un mot de passe.';
      return;
    }

    this.isSubmitting = true;

    this.auth.login(email, password).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigateByUrl('/');
      },
      error: () => {
        this.isSubmitting = false;
        this.error = 'Identifiants invalides';
      },
    });
  }
}
