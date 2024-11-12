import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';
import { UserService } from '../../services/user/user.service';
import { User } from '../../interfaces/interfaces';

@Component({
  selector: 'app-preferences',
  standalone: true,
  imports: [NavBarComponent],
  templateUrl: './preferences.component.html',
  styleUrl: './preferences.component.css'
})
export class PreferencesComponent implements OnInit {

  userData: User | null = null;

  constructor (private userService: UserService) {  }

  ngOnInit(): void {
    this.userData = this.userService.getInfo();
  }
}
