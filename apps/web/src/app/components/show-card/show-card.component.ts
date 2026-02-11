import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Spectacle } from '../../models/spectacle';

@Component({
  selector: 'app-show-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './show-card.component.html',
  styleUrls: ['./show-card.component.scss'],
})
export class ShowCardComponent {
  @Input({ required: true }) show!: Spectacle;

  formatDate(date: string): string {
    const d = new Date(date);
    if (Number.isNaN(d.getTime())) return date;
    return d.toLocaleString('fr-FR');
  }

  get imageSrc(): string {
    return this.show.image_url && this.show.image_url.trim().length > 0
      ? this.show.image_url
      : 'assets/img/default.jpg';
  }
}
