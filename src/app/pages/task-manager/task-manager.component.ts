import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { Task, User, UserScheme } from '../../interfaces/interfaces';
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
  userData: User | null = null;
  tasks: Task[] | undefined;
  selectedTask: Task | undefined;
  today = new Date().toISOString().slice(0, 10);
  isModalOpen: boolean = false;
  

  constructor (private router: Router, private userService: UserService, private taskService: TasksService) { }

  taskCreatorRedirect(): void {
    this.router.navigate(['/task-form'])
  }

  ngOnInit(): void {
    if (this.userID) {
      this.userService.getUserInfo(this.userID).subscribe({
        next: (data: UserScheme) => {
          this.userData = data.user;
          this.tasks = this.userData.tasks
        },
        error: (error: Error) => {
          console.error(`Error fetching data:`, error)
        },
        complete: () => {
          if (this.userData && this.userData.tasks) {
            this.sortTasksByDate(this.userData.tasks)
          }
        }
      })
    }
    
    setInterval(() => {
      this.checkAndUpdateTaskStatus(); 
    }, 6000); 
  }

  sortTasksByDate(tasks: Task[]): void {
    tasks.sort((taskA, taskB) => {
      const dateA: Date = new Date(`${taskA.deadLine}T${taskA.startTime}:00`);
      const dateB: Date = new Date(`${taskB.deadLine}T${taskB.startTime}:00`);

      return dateA.getTime() - dateB.getTime();
    });
  }

  checkAndUpdateTaskStatus(): void {
    const currentDate: Date = new Date(); 
  
    if (this.userData) {
      if (this.userData.tasks) {
        this.userData.tasks.forEach((task: Task) => {
  
          const taskStartDate: Date = new Date(`${task.deadLine}T${task.startTime}:00`); 
          const taskEndDate: Date = new Date(`${task.deadLine}T${task.endTime}:00`); 
      
          if (taskStartDate.toDateString() === currentDate.toDateString()) {
            if (taskStartDate <= currentDate && task.status !== 'In progress' && task.status !== 'Completed') {
              task.status = 'In progress';
              this.updateTaskStatus(task);
            }
          } else if (taskEndDate && taskEndDate < currentDate && task.status !== 'Completed') {
            task.status = 'Completed';
            this.updateTaskStatus(task);
          }
        });
      }
    }
  }
  
  updateTaskStatus(task: Task): void {
    const updatedTask: Task = { ...task, status: task.status };

    this.taskService.editTask(this.userID, task._id, updatedTask).subscribe({
      next: () => {
        return
      },
      error: (error: Error) => {
        console.error('Error updating task status:', error);
      }
    })
  }

  markAsCompleted(task: Task) {
    if (task.status !== 'Completed') {
      task.status = 'Completed';
      this.updateTaskStatus(task)
    }

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

  deleteTask(userID: string, taskID: string) {
    if (userID && taskID) {
      this.taskService.deleteTask(this.userID, taskID).subscribe({
        next: () => {
          this.tasks = this.tasks?.filter(task => task._id !== taskID);
        },
        error: (error) => {
          throw new Error(error)
        },
        complete: () => {
          this.closeModal()
          return
        }
      })
    }
  }

  openModal(task: Task) {
    this.isModalOpen = !this.isModalOpen
    this.selectTask(task)
  }

  closeModal() {
    this.isModalOpen = !this.isModalOpen
  }

  selectTask(task: Task) {
    this.selectedTask = task;
  }

}
