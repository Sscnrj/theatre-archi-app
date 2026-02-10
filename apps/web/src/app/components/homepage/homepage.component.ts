import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomepageService } from '../../services/homepage.service';
import { Show } from '../../models/show';
import { ShowCardComponent } from '../show-card/show-card.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ShowCardComponent
  ],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {

  shows: Show[] = [];
  searchTerm = '';
  sortBy = 'date';
  isLoading = true;

  constructor(private homepageService: HomepageService) {}

  ngOnInit(): void {
    this.homepageService.getShows().subscribe({
      next: (data) => {
        console.log('Ticketmaster data:', data);
        this.shows = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur API Ticketmaster', err);
        this.isLoading = false;
      }
    });
  }

  get filteredShows(): Show[] {
    const term = this.searchTerm.toLowerCase();
    let result = this.shows.filter(s =>
        s.title.toLowerCase().includes(term)
    );

    switch (this.sortBy) {
      case 'title':
        result = result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'place':
        result = result.sort((a, b) => a.place.localeCompare(b.place));
        break;
      case 'date':
      default:
        result = result.sort((a, b) => a.date.localeCompare(b.date));
        break;
    }

    return result;
  }
}
