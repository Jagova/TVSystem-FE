import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TvShow } from '../models/tv-show.model';

@Injectable({
  providedIn: 'root'
})
export class TvShowService {
  private apiUrl = 'http://localhost:8080/api/tvshows';

  constructor(private http: HttpClient) { }

  getTvShows(): Observable<TvShow[]> {
    return this.http.get<TvShow[]>(this.apiUrl);
  }

  getTvShowById(id: string): Observable<TvShow> {
    return this.http.get<TvShow>(`${this.apiUrl}/${id}`);
  }

  createTvShow(tvShow: TvShow): Observable<TvShow> {
    return this.http.post<TvShow>(this.apiUrl, tvShow);
  }

  updateTvShow(id: string, tvShow: TvShow): Observable<TvShow> {
    return this.http.put<TvShow>(`${this.apiUrl}/${id}`, tvShow);
  }

  deleteTvShow(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  likeTvShow(id: string, userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/like`, {
      userId
    });
  }

  dislikeTvShow(id: string, userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/dislike`, {
      userId
    });
  }
}
