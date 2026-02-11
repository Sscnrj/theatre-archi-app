import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  nom = '';
  prenom = '';
  email = '';
  password = '';

  isSubmitting = false;
  error = '';
  success = '';

  constructor(private auth: AuthService, private router: Router) {}

  register(): void {
    this.error = '';
    this.success = '';

    if (!this.nom.trim() || !this.prenom.trim() || !this.email.trim() || !this.password.trim()) {
      this.error = 'Veuillez remplir tous les champs.';
      return;
    }

    this.isSubmitting = true;

    this.auth
      .register({
        nom: this.nom.trim(),
        prenom: this.prenom.trim(),
        email: this.email.trim(),
        password: this.password,
      })
      .subscribe({
        next: () => {
          this.isSubmitting = false;
          this.success = 'Compte créé. Vous pouvez maintenant vous connecter.';
          // Redirection rapide vers login
          setTimeout(() => this.router.navigateByUrl('/login'), 400);
        },
        error: (err) => {
          this.isSubmitting = false;

          // Nest renvoie souvent { message: '...' } ou { message: ['...'] }
          const msg = err?.error?.message;
          if (Array.isArray(msg)) this.error = msg.join(', ');
          else if (typeof msg === 'string') this.error = msg;
          else this.error = 'Impossible de créer le compte.';
        },
      });
  }
}
