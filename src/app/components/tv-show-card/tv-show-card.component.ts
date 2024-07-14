import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TvShow } from '../../models/tv-show.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tv-show-card',
  templateUrl: './tv-show-card.component.html',
  styleUrls: ['./tv-show-card.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class TvShowCard {
  @Input() tvShow!: TvShow;
}
