import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-get-started',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './get-started.component.html',
  styleUrl: './get-started.component.css'
})
export class GetStartedComponent {
  slideToLogin() {
    const container = document.querySelector('.container');
    if (container) {
      container.classList.remove('slide-furthest');
      container.classList.add('slide-left');
    } else {
      console.error('Container not found');
    }
  }

  slideToRegister() {
    const container = document.querySelector('.container');
    if (container) {
      container.classList.remove('slide-left');
      container.classList.add('slide-furthest');
    } else {
      console.error('Container not found');
    }
  }
  
  constructor(private authService: AuthService, private router: Router) {}

  login(username: string, password: string, event: Event) {
    event.preventDefault();
    const result = this.authService.login(username, password);
    if (result) {
      this.router.navigate(['/dashboard']);
    } else {
      alert('Login failed');
    }
  }
}
