import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';
import { UserService } from '../../services/user/user.service';
import { User } from '../../interfaces/interfaces';
import { CommonModule } from '@angular/common';
import { PreferencesService } from '../../services/preferences/preferences.service';

@Component({
  selector: 'app-preferences',
  standalone: true,
  imports: [CommonModule, NavBarComponent],
  templateUrl: './preferences.component.html',
  styleUrl: './preferences.component.css'
})
export class PreferencesComponent implements OnInit {

  userData: User | null = null;
  userID: string | any = localStorage.getItem('userID');

  constructor (private userService: UserService, private preferencesService: PreferencesService) {  }

  ngOnInit(): void {
    this.userData = this.userService.getInfo();
    this.preferencesService.profileImage$.subscribe(newUrl => {
      if (newUrl && this.userData) {
        if (this.userData && this.userData.profile?.avatar) {
          this.userData.profile.avatar = newUrl;
        }
      }
    })
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  onFileSelected(event: Event):void {
    const input = event.target as HTMLInputElement;
    if (input.files?.[0]) {
      const selectedFile = input.files[0];
      this.uploadImage(selectedFile)
    }
  }

  uploadImage(file: File): void {
    const id = this.userID;

    this.preferencesService.uploadProfileImage(id, file).subscribe(
      (response) => {
        if (response && response.avatar) {
          if (this.userData && this.userData.profile?.avatar){
            this.userData.profile.avatar = response.avatar;
            this.preferencesService.updateProfileImage(response.avatar)
            alert('Profile picture updated successfully!')
          }
        }
      },
      (error) => {
        console.error('Error uploading image: ', error);
        alert('Error uploading image, please try again.')
      }
    )
  }
}