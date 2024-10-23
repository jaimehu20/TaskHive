import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { NavBarComponent } from "../../shared/components/nav-bar/nav-bar.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit {

  userID: string | null = null;
  userData: any = null;

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userID = params.get('id');
    })  
    if (this.userID) {
      this.userService.getUserInfo(this.userID).subscribe({
        next: (data: any) => {
          this.userData = data.user;
        },
        error: (error: any) => {
          console.error(`Error fetching data:`, error)
        },
        complete: () => {
          console.log(`Data fetching complete`);
        }
      })
    }  
  }
}
