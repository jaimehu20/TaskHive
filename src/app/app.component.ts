import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GetStartedComponent } from './pages/get-started/get-started.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GetStartedComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
