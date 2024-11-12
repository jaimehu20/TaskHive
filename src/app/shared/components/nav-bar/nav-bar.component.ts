import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {

  mainMenuOpened: boolean = false;
  profileMenuOpened: boolean = false;
  userID: string | null = null;

  constructor(private router: Router) {  }

  ngOnInit(): void {
    this.userID = localStorage.getItem('userID')
  }

  toggleMainMenu(): void {
    this.mainMenuOpened = !this.mainMenuOpened;
    this.profileMenuOpened = false
  }

  toggleProfileMenu(): void {
    this.profileMenuOpened = !this.profileMenuOpened;
    this.mainMenuOpened = false
  }

  logOut(): void {
    localStorage.removeItem('authTOKEN');
    localStorage.removeItem('userID');
    this.router.navigate(['/get-started'])
  }

  navigateTo(route: string): void {
    this.router.navigate([`/${route}`])
    this.toggleMainMenu()
  }

  navigateToDashboard(): void {
    this.router.navigate([`/dashboard/${this.userID}`])
    this.toggleMainMenu()
  }

}
