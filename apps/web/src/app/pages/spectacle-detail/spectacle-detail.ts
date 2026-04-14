import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ReservationService } from '../../core/services/reservation';
import { SpectacleService } from '../../core/services/spectacle';
import { SpectacleItem } from '../../core/models/spectacle.models';

@Component({
  selector: 'app-spectacle-detail',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, DatePipe, CurrencyPipe],
  templateUrl: './spectacle-detail.html',
  styleUrl: './spectacle-detail.scss',
})
export class SpectacleDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly spectacleService = inject(SpectacleService);
  private readonly reservationService = inject(ReservationService);
  private readonly fb = inject(FormBuilder);

  readonly reservationForm = this.fb.nonNullable.group({
    nombrePlaces: [1, [Validators.required, Validators.min(1)]],
  });

  spectacleId: number | null = null;
  spectacle: SpectacleItem | null = null;
  isLoading = true;
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (Number.isNaN(id) || id <= 0) {
      this.errorMessage = 'Identifiant de spectacle invalide.';
      this.isLoading = false;
      return;
    }

    this.spectacleId = id;
    this.fetchSpectacle(id);
  }

  reserve(): void {
    if (this.reservationForm.invalid || this.spectacleId === null) {
      this.reservationForm.markAllAsTouched();
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';
    this.isSubmitting = true;

    this.reservationService
      .create({
        spectacleId: this.spectacleId,
        nombrePlaces: this.reservationForm.getRawValue().nombrePlaces,
      })
      .subscribe({
        next: (reservation) => {
          this.isSubmitting = false;
          this.successMessage = `Reservation confirmee (#${reservation.id}).`;
        },
        error: () => {
          this.isSubmitting = false;
          this.errorMessage = 'Impossible de finaliser la reservation.';
        },
      });
  }

  private fetchSpectacle(id: number): void {
    this.isLoading = true;
    this.spectacleService.getById(id).subscribe({
      next: (item) => {
        this.spectacle = item;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Spectacle introuvable.';
        this.isLoading = false;
      },
    });
  }
}
