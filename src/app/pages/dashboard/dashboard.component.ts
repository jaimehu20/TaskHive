import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user/user.service';
import { NavBarComponent } from "../../shared/components/nav-bar/nav-bar.component";
import { Task } from "../../interfaces/interfaces"

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavBarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit {

  userID: string | null = null;
  userData: any = null;
  tasks: any = null;
  todaysTasks: Task[] = [];
  nearbyTasks: Task[] = [];
  groupedTasks: { [date: string]: any[] } = {};
  groupedKeys: string[] = [];

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userID = params.get('id');
    })  
    if (this.userID) {
      this.userService.getUserInfo(this.userID).subscribe({
        next: (data: any) => {
          this.userData = data.user;
          this.tasks = this.userData.tasks
        },
        error: (error: any) => {
          console.error(`Error fetching data:`, error)
        },
        complete: () => {
          this.userService.setUserInfo(this.userData)
          this.taskFilter()
          this.groupNearbyTasksByDate();
          this.groupedKeys = Object.keys(this.groupedTasks);
          return
        }
      })
    }  
  }

  taskCreatorRedirect() {
    this.router.navigate(['/task-form'])
  }

  taskFilter() {
    const today = new Date().toISOString().slice(0, 10);

    this.todaysTasks = this.tasks.filter((task: Task) => {
      const taskDate  = task.deadLine.slice(0, 10);
      return taskDate === today;
    });

    this.nearbyTasks = this.tasks.filter((task: Task) => {
      const taskDate = task.deadLine.slice(0, 10);
      return taskDate > today;
    })
  }

  groupNearbyTasksByDate(): void {
    this.groupedTasks = this.nearbyTasks.reduce((acc, task) => {
      const date = task.deadLine;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(task);
      return acc
    }, {} as { [date: string]: any[] });
  }

}
