import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TvShowService } from '../../services/tv-show.service';
import { TvShow } from '../../models/tv-show.model';
import { RouterModule } from '@angular/router';
import { TvShowCard } from '../../components/tv-show-card/tv-show-card.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule, TvShowCard, RouterModule]
})
export class HomeComponent implements OnInit {
  tvShows: TvShow[] = [];

  constructor(private tvShowService: TvShowService) { }

  ngOnInit(): void {
    this.tvShowService.getTvShows().subscribe({
      next: (tvShows) => { this.tvShows = tvShows },
      error: (error) => console.error('There was an error!', error)
    });
  }
}
