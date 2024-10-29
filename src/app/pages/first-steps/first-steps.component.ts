import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PreferencesService } from '../../services/preferences/preferences.service';

interface Question {
  question: string,
  options?: string[],
  answer: string
}

@Component({
  selector: 'app-first-steps',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './first-steps.component.html',
  styleUrl: './first-steps.component.css'
})

export class FirstStepsComponent implements OnInit {

  form: FormGroup
  showError: boolean = false;
  questions: Question[] = [
    { question: 'Would you like to receive reminders about your pending tasks?', options: ['Yes', 'No'], answer: ''},
    { question: 'How often would you like to receive reminders?', options: ['Hourly', 'Daily', 'Weekly'], answer: '' },
    { question: 'What date format would you prefer?', options: ['DD/MM/YYYY', 'YYYY/MM/DD'], answer: '' },
    { question: 'What time format would you prefer?', options: ['12H', '24H'], answer: '' },
    { question: 'When does your week start?', options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], answer: '' },
    { question: 'Select your UI preference:', options: ['Light', 'Dark'], answer: '' }
  ]
  currentQuestionIndex: number = 0;
  userID: string | null = null;
  preferences: any = {};

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private preferencesService: PreferencesService) { 
    this.form = this.fb.group({
      answer: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userID = params.get('id');
    })
  }

  onNext() {
    if (this.form.valid) {
      const currentQuestion = this.questions[this.currentQuestionIndex];
      const answer = this.form.value.answer;

      switch (this.currentQuestionIndex) {
        case 0:
          this.preferences.reminder = answer === 'Yes';
          break;
        case 1:
          this.preferences.reminderFrequency = answer;
          break;
        case 2:
          this.preferences.dateFormat = answer;
          break;
        case 3:
          this.preferences.timeFormat = answer;
          break;
        case 4:
          this.preferences.weekBegins = answer.toLowerCase();
          break;
        case 5:
          this.preferences.uiMode = answer.toLowerCase();
          break;
      }

      if (this.isLastQuestion()) {
        if (this.userID) {
          this.preferencesService.updatePreferences(this.userID, this.preferences).subscribe({
            next: (response) => {
              this.router.navigate([`/dashboard/${this.userID}`]);
            },
            error: (err) => {
              console.error('Error updating preferences:', err);
            },
            complete: () => {
              return
            }
          });
        }
      } else {
        this.currentQuestionIndex++;
        this.form.reset();
        this.showError = false;
      }
    } else {
      this.showError = true;
    }
  }

  isLastQuestion(): boolean {
    return this.currentQuestionIndex === this.questions.length - 1;
  }
}