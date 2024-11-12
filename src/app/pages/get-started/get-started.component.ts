import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-get-started',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LoginComponent, RegisterComponent],
  templateUrl: './get-started.component.html',
  styleUrl: './get-started.component.css'
})
export class GetStartedComponent {

  slideToLogin(): void {
    const container: HTMLElement | null = document.querySelector('.container');
    if (container) {
      container.classList.remove('slide-furthest');
      container.classList.add('slide-left');
    } else {
      console.error('Container not found');
    }
  }
}