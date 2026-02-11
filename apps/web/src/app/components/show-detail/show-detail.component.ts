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
  styleUrls: ['./show-detail.component.scss']
})
export class ShowDetailComponent implements OnInit {

  show!: Spectacle | null;
  isLoading = true;

  constructor(
      private route: ActivatedRoute,
      private homepageService: HomepageService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.loadShowDetails(id);
  }

  loadShowDetails(id: string) {
    this.homepageService.getShowDetails(id).subscribe(show => {
      this.show = show;
      this.isLoading = false;
    });
  }

  reserve() {
    if (this.show?.ticketUrl) {
      window.open(this.show.ticketUrl, '_blank');
    }
  }
}
