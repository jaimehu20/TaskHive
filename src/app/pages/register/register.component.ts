import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register/register.service';
import { passwordMatchValidator } from '../../validators/password-match.validator';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../interfaces/interfaces';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private registerService: RegisterService, private router: Router, private authService: AuthService) {
    this.registerForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      birthdate: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordconf: ['', Validators.required]
    },{
      validators: passwordMatchValidator()
    });
  }

  slideToLogin(): void {
    const container: HTMLElement | null = document.querySelector('.container');
    if (container) {
      container.classList.remove('slide-furthest');
      container.classList.add('slide-left');
    } else {
      console.error('Container not found');
    }
  }

  register(event: Event): void {
    event.preventDefault();
    if (this.registerForm.valid) {
      const userData: User = this.registerForm.value;
      this.registerService.register(userData).subscribe({
        next: response => {
          if (response) {
            this.autoLogin(userData.email, userData.password, event)
          }
        },
        error: err => {
          this.errorMessage = err.message
        },
        complete: () => {
          return
        }
      })
    }
  }

  autoLogin(username: string, password: string, event: Event): void {
    event.preventDefault();
    
    this.authService.login(username, password).subscribe({
      next: response => {
          if (response && localStorage.getItem('userID')) {
            const userId: string | null = localStorage.getItem('userID');
            if (userId) {
              this.router.navigate([`/first-steps/${userId}`]);
            }
          } else {
            alert('Login failed');
          }
      },
      error: err => {
        console.error(`Login error:` , err);
        alert('Login failed. Please check your credentials and try again.')
      },
      complete: () => {
        return
      }
    });
  }

  passwordsDoNotMatch(): boolean {
    return this.registerForm.hasError('passwordsMismatch');
  }
}