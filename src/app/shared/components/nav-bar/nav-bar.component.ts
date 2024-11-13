import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../interfaces/interfaces';
import { PreferencesService } from '../../../services/preferences/preferences.service';

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
  userID: string | null = localStorage.getItem('userID');
  userData: User | null = null;
  avatarUrl: string | null = null;

  constructor(private router: Router, private userService : UserService, private preferencesService: PreferencesService) {  }

  ngOnInit(): void {
    if (this.userID) {
      this.userData = this.userService.getInfo();
    }

    if (this.userData?.profile?.avatar) {
      this.getProfileImage(this.userData.profile.avatar)
    }
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

  getProfileImage(avatarID: string): void {
    this.preferencesService.getProfileImage(avatarID).subscribe(
      (imageBlob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.avatarUrl = reader.result as string;
        };
        reader.readAsDataURL(imageBlob);
      },
      (error) => {
        console.error('Error fetching image:', error);
      }
    );
  }

}
