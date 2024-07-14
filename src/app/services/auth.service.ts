import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private tokenKey = 'authToken';
  private userKey = 'user';

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: { username: string, password: string }): Observable<any> {
    return new Observable(observer => {
      this.http.post(`${this.apiUrl}/login`, credentials).subscribe({
        next: (res: any) => {
          localStorage.setItem(this.tokenKey, res.token);
          localStorage.setItem(this.userKey, JSON.stringify(res.user)); // Guardar el objeto user en localStorage
          this.router.navigate(['/']);
          observer.next(res);
          observer.complete();
        },
        error: (err) => {
          observer.error(err);
        }
      });
    });
  }

  register(user: { username: string, password: string, email: string }) {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey); 
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  isAdmin(): boolean {
    const user = this.getUser();
    return user?.role === 'admin';
  }

  getUserId(): string {
    const user = this.getUser();
    return  user?._id ?? '';
  }

  getUsername(): string {
    const user = this.getUser();
    return user?.username ?? '';
  }

  getRole(): string {
    const user = this.getUser();
    return user?.role ?? '';
  }

  private getUser(): User | null {
    const userJson = localStorage.getItem(this.userKey);
    return userJson ? JSON.parse(userJson) as User : null;
  }
}
