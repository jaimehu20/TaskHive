import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TasksService } from '../../services/task/tasks.service';
import { Router } from '@angular/router';
import { timeValidator } from '../../validators/time.validators';
import { Task } from '../../interfaces/interfaces';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, NavBarComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {

  taskForm: FormGroup;
  errorMessage: string | null = null;
  priority: string | null = null;
  tagInput: string = '';
  tags: string[] = [];

  constructor(private fb: FormBuilder, private taskService : TasksService, private router: Router) { 
    this.taskForm = this.fb.group({
      taskName: ['', Validators.required],
      taskDescription: ['', Validators.required],
      deadLine: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      priority: [this.priority, Validators.required],
      status: ['Pending'],
      tags: [[]]
    }, { validators: timeValidator() });
   }

  setPriority(value: string): void {
    this.priority = value
    this.taskForm.get('priority')?.setValue(this.priority)
  }

  addTag(): void {
    if (this.tagInput && this.tags.length < 3) {
      this.tags.push(this.tagInput);
      this.taskForm.get('tags')?.setValue(this.tags);
      this.tagInput = '';
    }
  }

  removeTag(index: number): void {
    this.tags.splice(index, 1);
    this.taskForm.get('tags')?.setValue(this.tags);
  }

  submit(event: Event): void {
    event.preventDefault();
    if (this.taskForm.valid) {
      const taskData: Task = this.taskForm.value;
      const userID: string | null = localStorage.getItem('userID');
      if (userID) {
        this.taskService.addTask(userID, taskData).subscribe({
          next: () => {
            return
          },
          error: err => {
            this.errorMessage = err.message
          },
          complete: () => {
            this.router.navigate([`/dashboard/${userID}`])
          }
        })
      }
    }
  }

}
