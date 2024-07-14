import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { TvShowService } from '../../services/tv-show.service';
import { TvShow } from '../../models/tv-show.model';
import { AuthService } from '../../services/auth.service'; // Suponiendo que tienes un AuthService

@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.component.html',
  styleUrls: ['./show-detail.component.css'],
  standalone: true,
  imports: [CommonModule, NgIf]
})
export class ShowDetailComponent implements OnInit {
  tvShow: TvShow | undefined;
  isLiked: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private tvShowService: TvShowService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.tvShowService.getTvShowById(id).subscribe({
        next: (tvShow) => {
          this.tvShow = tvShow;
          this.isLiked = this.tvShow.likes.includes(this.authService.getUserId());
        },
        error: (error) => console.error('There was an error!', error)
      });
    }
  }

  toggleLike(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    const userId = this.authService.getUserId();

    if (this.isLiked) {
      this.tvShowService.dislikeTvShow(this.tvShow!._id!, userId).subscribe({
        next: () => {
          this.tvShow!.likes = this.tvShow!.likes.filter(id => id !== userId);
          this.isLiked = false;
        },
        error: (error) => console.error('There was an error!', error)
      });
    } else {
      this.tvShowService.likeTvShow(this.tvShow!._id!, userId).subscribe({
        next: () => {
          this.tvShow!.likes.push(userId);
          this.isLiked = true;
        },
        error: (error) => console.error('There was an error!', error)
      });
    }
  }
}
