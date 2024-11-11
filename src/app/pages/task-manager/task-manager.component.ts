import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { Task } from '../../interfaces/interfaces';
import { EMPTY, interval, Observable, switchMap } from 'rxjs';
import { TasksService } from '../../services/task/tasks.service';

@Component({
  selector: 'app-task-manager',
  standalone: true,
  imports: [CommonModule, NavBarComponent],
  templateUrl: './task-manager.component.html',
  styleUrl: './task-manager.component.css'
})
export class TaskManagerComponent implements OnInit {

  userID: string | null = localStorage.getItem('userID');
  userData: any;
  today = new Date().toISOString().slice(0, 10);

  constructor (private router: Router, private userService: UserService, private taskService: TasksService) { }

  taskCreatorRedirect(): void {
    this.router.navigate(['/task-form'])
  }

  ngOnInit(): void {
    if (this.userID) {
      this.userService.getUserInfo(this.userID).subscribe({
        next: (data: any) => {
          this.userData = data.user;
        },
        error: (error: any) => {
          console.error(`Error fetching data:`, error)
        },
        complete: () => {
          this.sortTasksByDate(this.userData.tasks)
        }
      })
    }
    
    setInterval(() => {
      this.checkAndUpdateTaskStatus(); 
    }, 60000); 
  }

  sortTasksByDate(tasks: Task[]): void {
    tasks.sort((taskA, taskB) => {
      const dateA = new Date(taskA.deadLine);
      const dateB = new Date(taskB.deadLine);

      return dateA.getTime() - dateB.getTime();
    });
  }

  checkAndUpdateTaskStatus(): void {
    const currentDate = new Date(); 
  
    this.userData.tasks.forEach((task: Task) => {

      const taskStartDate = new Date(`${task.deadLine}T${task.startTime}:00`); 
      const taskEndDate = new Date(`${task.deadLine}T${task.endTime}:00`); 
  
      if (taskStartDate.toDateString() === currentDate.toDateString()) {
        if (taskStartDate <= currentDate && task.status !== 'In progress') {
          task.status = 'In progress';
          this.updateTaskStatus(task);
        }
      }
      if (taskEndDate && taskEndDate < currentDate && task.status !== 'Completed') {
        task.status = 'Completed';
        this.updateTaskStatus(task);
      }
    });
  }
  
  
  updateTaskStatus(task: Task): void {
    const updatedTask: Task = { ...task, status: task.status };

    this.taskService.editTask(this.userID, task._id, updatedTask).subscribe({
      next: () => {
        console.log(`Task ${task.taskName} status updated to ${task.status}`);
      },
      error: (error) => {
        console.error('Error updating task status:', error);
      }
    })
  }

  getTaskClass(task: string): string {
    if (task === 'Pending') {
      return 'pending'
    } else if (task === 'In progress') {
      return 'inprogress'
    } else {
      return 'completed'
    }
  }

}
