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
  avatarUrl: string = '';

  constructor (private userService: UserService, private preferencesService: PreferencesService) {  }

  ngOnInit(): void {
    this.userData = this.userService.getInfo();

    if (this.userData?.profile?.avatar) {
      this.getProfileImage(this.userData.profile.avatar)
    }
  }

  triggerFileInput(): void {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();  
    }
  }
  
  onFileSelected(event: any): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      this.preferencesService.uploadProfileImage(this.userID, file).subscribe({
        next: (response) => console.log('Image uplodaded successfully', response),
        error: (error) => console.error('Error uploading image:', error)
      })
    } else {
      console.error('No file selected.')
    }
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
