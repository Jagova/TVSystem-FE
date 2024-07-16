import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TvShowService } from '../../services/tv-show.service';
import { TvShow } from '../../models/tv-show.model';
import { TvShowDialogComponent } from '../../components/tv-show-dialog/tv-show-dialog.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TvShowDialogComponent
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  tvShows: TvShow[] = [];
  @ViewChild(TvShowDialogComponent) tvShowDialog!: TvShowDialogComponent;

  constructor(private tvShowService: TvShowService) { }

  ngOnInit(): void {
    this.loadTvShows();
  }

  loadTvShows(): void {
    this.tvShowService.getTvShows().subscribe(tvShows => {
      this.tvShows = tvShows;
    });
  }

  openCreateDialog(): void {
    const newTvShow = { name: '', year: 0, episodes: 0, image: '', description: '', genre: '' };
    this.tvShowDialog.title = 'Create TV Show';
    this.tvShowDialog.action = 'Create';
    this.tvShowDialog.tvShow = newTvShow;
    this.showModal();
  }

  openEditDialog(tvShow: TvShow): void {
    this.tvShowDialog.title = 'Edit TV Show';
    this.tvShowDialog.action = 'Save';
    this.tvShowDialog.tvShow = { ...tvShow };
    this.showModal();
  }

  openDeleteDialog(tvShow: TvShow): void {
    if (confirm(`Are you sure you want to delete ${tvShow.name}?`)) {
      this.tvShowService.deleteTvShow(tvShow._id!).subscribe(() => {
        this.loadTvShows();
        alert('TV Show deleted successfully!');
      });
    }
  }

  private showModal(): void {
    const modal = document.getElementById('tvShowModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  onSave(tvShow: any): void {
    if (this.tvShowDialog.action === 'Create') {
      this.tvShowService.createTvShow(tvShow).subscribe(() => {
        this.loadTvShows();
        alert('TV Show created successfully!');
      });
    } else {
      this.tvShowService.updateTvShow(tvShow._id, tvShow).subscribe(() => {
        this.loadTvShows();
        alert('TV Show updated successfully!');
      });
    }
  }
}
