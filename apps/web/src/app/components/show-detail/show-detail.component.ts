import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomepageService } from '../../services/homepage.service';
import { CommonModule } from '@angular/common';
import { Spectacle } from '../../models/spectacle';

@Component({
  selector: 'app-show-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './show-detail.component.html',
  styleUrls: ['./show-detail.component.scss'],
})
export class ShowDetailComponent implements OnInit {
  show: Spectacle | null = null;
  isLoading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private homepageService: HomepageService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.error = 'Identifiant spectacle invalide.';
      this.isLoading = false;
      return;
    }
    this.loadShowDetails(id);
  }

  loadShowDetails(id: number): void {
    this.isLoading = true;
    this.error = '';

    this.homepageService.getShowDetails(id).subscribe({
      next: (show) => {
        this.show = show;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur détail spectacle', err);
        this.error = 'Impossible de charger ce spectacle.';
        this.isLoading = false;
      },
    });
  }

  formatDate(date: string): string {
    const d = new Date(date);
    if (Number.isNaN(d.getTime())) return date;
    return d.toLocaleString('fr-FR');
  }

  get imageSrc(): string {
    if (!this.show) return 'assets/img/default.jpg';
    return this.show.image_url && this.show.image_url.trim().length > 0
      ? this.show.image_url
      : 'assets/img/default.jpg';
  }

  reserve(): void {
    if (!this.show) return;

    if (this.show.nb_places_restantes <= 0) {
      alert('Désolé, il ne reste plus de places.');
      return;
    }

    // Ici : vous brancherez votre POST /api/reservations
    alert('Réservation à implémenter : appel POST /api/reservations');
  }
}
