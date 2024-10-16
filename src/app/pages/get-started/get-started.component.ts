import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-get-started',
  standalone: true,
  imports: [CommonModule],
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
}
