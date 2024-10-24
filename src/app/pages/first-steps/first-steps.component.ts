import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

interface Question {
  question: string,
  type: string,
  options?: string[]
  answer: string
}

@Component({
  selector: 'app-first-steps',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './first-steps.component.html',
  styleUrl: './first-steps.component.css'
})
export class FirstStepsComponent {

  form: FormGroup

  constructor(private fb: FormBuilder) { 
    this.form = this.fb.group({
      answer: ['']
    });
  }

  onNext() {
    this.questions[this.currentQuestionIndex].answer = this.form.value.answer;
    this.currentQuestionIndex++; 
    this.form.reset();
  }

  questions: Question[] = [
    { question: 'Would you like to receive reminders about your pending tasks?', type: 'select', options: ['Yes', 'No'], answer: ''},
    { question: 'How often would you like to receive reminders?', type: 'select', options: ['Hourly', 'Daily', 'Weekly'], answer: '' },
    { question: 'What date format would you prefer?', type: 'select', options: ['dd/mm/yyyy', 'yyyy/mm/dd'], answer: '' },
    { question: 'What time format would you prefer?', type: 'select', options: ['12H', '24h'], answer: '' },
    { question: 'When does your week start?', type: 'select', options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], answer: '' },
    { question: 'Select your preference:', type: 'select', options: ['light', 'dark'], answer: '' }
  ]

  currentQuestionIndex: number = 0;

  

  submitPreferences() {
    console.log('Correcto')
  }

}
