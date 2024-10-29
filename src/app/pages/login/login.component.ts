import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router) {}

  slideToRegister() {
    const container = document.querySelector('.container');
    if (container) {
      container.classList.remove('slide-left');
      container.classList.add('slide-furthest');
    } else {
      console.error('Container not found');
    }
  }

  login(username: string, password: string, event: Event) {
    event.preventDefault();
    
    this.authService.login(username, password).subscribe({
      next: response => {
          if (response && localStorage.getItem('userID')) {
            const userId = localStorage.getItem('userID');
            if (userId) {
              this.router.navigate([`/dashboard/${userId}`]);
            }
          } else {
            alert('Login failed');
          }
      },
      error: err => {
        console.error(`Login error:` , err);
        alert('Login failed. Please check your credentials and try again.')
      },
      complete: () => {
        return
      }
    });
  }
}