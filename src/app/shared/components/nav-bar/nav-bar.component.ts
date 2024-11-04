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

  constructor(private router: Router, private route: ActivatedRoute) {  }

  ngOnInit(): void {
    this.userID = localStorage.getItem('userID')
  }

  toggleMainMenu() {
    this.mainMenuOpened = !this.mainMenuOpened;
    this.profileMenuOpened = false
  }

  toggleProfileMenu() {
    this.profileMenuOpened = !this.profileMenuOpened;
    this.mainMenuOpened = false
  }

  logOut() {
    localStorage.removeItem('authTOKEN');
    localStorage.removeItem('userID');
    this.router.navigate(['/get-started'])
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`])
    this.toggleMainMenu()
  }

  navigateToDashboard() {
    this.router.navigate([`/dashboard/${this.userID}`])
    this.toggleMainMenu()
  }

}
