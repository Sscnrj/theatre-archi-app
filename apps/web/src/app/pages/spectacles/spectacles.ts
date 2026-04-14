import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SpectacleItem } from '../../core/models/spectacle.models';
import { SpectacleService } from '../../core/services/spectacle';

@Component({
  selector: 'app-spectacles',
  imports: [CommonModule, RouterLink, DatePipe, CurrencyPipe],
  templateUrl: './spectacles.html',
  styleUrl: './spectacles.scss',
})
export class Spectacles implements OnInit {
  private readonly spectacleService = inject(SpectacleService);

  spectacles: SpectacleItem[] = [];
  isLoading = true;
  errorMessage = '';

  ngOnInit(): void {
    this.loadSpectacles();
  }

  trackById(_: number, spectacle: SpectacleItem): number {
    return spectacle.id;
  }

  private loadSpectacles(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.spectacleService.list().subscribe({
      next: (items) => {
        this.spectacles = items;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Impossible de charger les spectacles.';
        this.isLoading = false;
      },
    });
  }
}
