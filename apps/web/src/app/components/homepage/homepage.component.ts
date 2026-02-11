import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomepageService } from '../../services/homepage.service';
import { Spectacle } from '../../models/spectacle';
import { ShowCardComponent } from '../show-card/show-card.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, FormsModule, ShowCardComponent],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  shows: Spectacle[] = [];
  searchTerm = '';
  sortBy: 'titre' | 'date' | 'prix' = 'date';
  isLoading = true;
  error = '';

  constructor(private homepageService: HomepageService) {}

  ngOnInit(): void {
    this.homepageService.getShows().subscribe({
      next: (data) => {
        this.shows = data ?? [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur API Spring', err);
        this.error = 'Impossible de charger les spectacles.';
        this.isLoading = false;
      },
    });
  }

  get filteredShows(): Spectacle[] {
    const term = this.searchTerm.trim().toLowerCase();

    let result = [...this.shows];

    if (term) {
      result = result.filter((s) => (s.titre ?? '').toLowerCase().includes(term));
    }

    switch (this.sortBy) {
      case 'titre':
        result.sort((a, b) => (a.titre ?? '').localeCompare(b.titre ?? ''));
        break;

      case 'prix':
        result.sort((a, b) => Number(a.prix ?? 0) - Number(b.prix ?? 0));
        break;

      case 'date':
      default:
        result.sort((a, b) => {
          const da = Date.parse(a.date_spectacle ?? '');
          const db = Date.parse(b.date_spectacle ?? '');
          return (Number.isNaN(da) ? 0 : da) - (Number.isNaN(db) ? 0 : db);
        });
        break;
    }

    return result;
  }

  trackById(_: number, s: Spectacle): number {
    return s.id;
  }
}
