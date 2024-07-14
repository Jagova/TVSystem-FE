import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService) { }

  login() {
    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: () => {
        this.errorMessage = '';
      },
      error: () => {
        this.errorMessage = 'Invalid username or password';
      }
    });
  }
}
