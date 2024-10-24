import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register/register.service';
import { passwordMatchValidator } from '../../validators/password-match.validator';
import { CommonModule } from '@angular/common';

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

  constructor(private fb: FormBuilder, private registerService: RegisterService, private router: Router) {
    this.registerForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
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

  slideToLogin() {
    const container = document.querySelector('.container');
    if (container) {
      container.classList.remove('slide-furthest');
      container.classList.add('slide-left');
    } else {
      console.error('Container not found');
    }
  }

  register(event: Event) {
    event.preventDefault();
    if (this.registerForm.valid) {
      const userData = this.registerForm.value;
      this.registerService.register(userData).subscribe({
        next: response => {
          if(response) {
            console.log('User registered successfully',  response)
          }
        },
        error: err => {
          this.errorMessage = err.message
        },
        complete: () => {
          this.router.navigate(['/first-steps'])
        }
      })
    }
  }

  passwordsDoNotMatch(): boolean {
    return this.registerForm.hasError('passwordsMismatch');
  }
}