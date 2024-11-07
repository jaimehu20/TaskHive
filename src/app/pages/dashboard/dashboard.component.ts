import { ChangeDetectorRef, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user/user.service';
import { NavBarComponent } from "../../shared/components/nav-bar/nav-bar.component";
import { Task } from "../../interfaces/interfaces"
import { TasksService } from '../../services/task/tasks.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavBarComponent, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit {

  userID: string | null = localStorage.getItem('userID');
  userData: any = null;
  tasks: Task[] = [];
  todaysTasks: Task[] = [];
  closestTask: Task | null = null;
  nearbyTasks: Task[] = [];
  selectedTask: Task | null = null;
  groupedTasks: { [date: string]: any[] } = {};
  groupedKeys: string[] = [];
  isModalOpen: boolean = false;
  confirmErase: boolean = false;
  taskForm: FormGroup | any = null;
  editMode: boolean = false;

  constructor(private userService: UserService, private router: Router, private taskService: TasksService, private cdr: ChangeDetectorRef, private fb: FormBuilder) { }

  ngOnInit(): void {

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

  initializeForm(): void {
    this.taskForm = this.fb.group({
      taskName: [this.selectedTask?.taskName || ''],
      taskDescription: [this.selectedTask?.taskDescription || null],
      deadLine: [this.selectedTask?.deadLine || ''],
      startTime: [this.selectedTask?.startTime || ''],
      endTime: [this.selectedTask?.endTime || null],
      priority: [this.selectedTask?.priority || ''],
      status: [this.selectedTask?.status || null],
      tags: [this.selectedTask?.tags || '']
    });

    this.taskForm.disable();
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode

    if (this.editMode) {
      this.taskForm?.enable();
    } else {
      this.taskForm?.disable()
    }
  }

  taskCreatorRedirect(): void {
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

    if (this.todaysTasks.length > 0) {
      this.closestTask = this.todaysTasks.sort((a, b) => {
        return a.startTime.localeCompare(b.startTime);
      })[0];
    }

    this.sortTasksByDate(this.todaysTasks);
    this.sortTasksByDate(this.nearbyTasks);
  }

  sortTasksByDate(tasks: Task[]): void {
    tasks.sort((taskA, taskB) => {
      const dateA = new Date(taskA.deadLine);
      const dateB = new Date(taskB.deadLine);

      return dateA.getTime() - dateB.getTime();
    });
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

  openModalForm(task: Task): void {
    this.selectedTask = task;
    this.isModalOpen = true
    this.initializeForm()
  }

  closeModalForm(): void {
    this.isModalOpen = false;
  }

  confirmEraseMessage(): void {
    this.confirmErase = !this.confirmErase;
  }

  editTask(): void {
    if (this.taskForm?.valid && this.selectedTask) {
      const updatedTask = { ...this.selectedTask, ...this.taskForm.value };
      this.taskService.editTask(this.userID, this.selectedTask._id, updatedTask).subscribe({
        next: () => {
          const index = this.tasks.findIndex(task => task._id === this.selectedTask?._id);
          if (index !== -1) {
            this.tasks[index] = updatedTask;
          }
          this.taskFilter();
          this.groupNearbyTasksByDate();
          this.toggleEditMode();
        },
        error: err => {
          throw new Error(err)
        },
        complete: () => {
          this.closeModalForm();
        }
      })
    }
  }

  deleteTask(): void {
    if (this.selectedTask) {
      const taskID = this.selectedTask._id;
      this.taskService.deleteTask(this.userID, taskID).subscribe({
        next: () => {
          this.tasks = this.tasks.filter(task => task._id !== taskID);
          this.todaysTasks = this.todaysTasks.filter(task => task._id !== taskID);
          this.nearbyTasks = this.nearbyTasks.filter(task => task._id !== taskID);
          this.nearbyTasks = [...this.nearbyTasks];
          this.taskFilter();
          this.groupNearbyTasksByDate();
          this.cdr.detectChanges()
        },
        error: err => {
          throw new Error(err)
        },
        complete: () => {
          this.closeModalForm();
        }
      })
    }
  }

}
