import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Spectacle } from '../../models/spectacle';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-show-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './show-card.component.html',
  styleUrls: ['./show-card.component.scss']
})
export class ShowCardComponent {
  @Input() show!: Spectacle;
}
