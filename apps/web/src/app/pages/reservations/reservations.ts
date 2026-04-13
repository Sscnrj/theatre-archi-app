import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ReservationItem } from '../../core/models/reservation.models';
import { ReservationService } from '../../core/services/reservation';

@Component({
  selector: 'app-reservations',
  imports: [CommonModule, DatePipe, CurrencyPipe],
  templateUrl: './reservations.html',
  styleUrl: './reservations.scss',
})
export class Reservations implements OnInit {
  private readonly reservationService = inject(ReservationService);

  reservations: ReservationItem[] = [];
  isLoading = true;
  errorMessage = '';
  cancelingId: number | null = null;

  ngOnInit(): void {
    this.loadReservations();
  }

  cancel(id: number): void {
    this.errorMessage = '';
    this.cancelingId = id;
    this.reservationService.cancel(id).subscribe({
      next: () => {
        this.reservations = this.reservations.filter((reservation) => reservation.id !== id);
        this.cancelingId = null;
      },
      error: () => {
        this.errorMessage = 'Impossible d annuler cette reservation.';
        this.cancelingId = null;
      },
    });
  }

  trackById(_: number, reservation: ReservationItem): number {
    return reservation.id;
  }

  private loadReservations(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.reservationService.listMine().subscribe({
      next: (items) => {
        this.reservations = items;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Impossible de charger les reservations.';
        this.isLoading = false;
      },
    });
  }
}
