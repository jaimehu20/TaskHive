import { Component } from '@angular/core';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { User, UserScheme } from '../../interfaces/interfaces';
import { ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [NavBarComponent, FullCalendarModule, CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {

  userID: string | any = localStorage.getItem('userID');
  userData: User | null = null;
  events: any[] = [];
  @ViewChild('calendar') calendarComponent: FullCalendarComponent | undefined;
  showTasks = false;
  selectedDate: Date | null = null;
  tasksForSelectedDate: any[] = [];
 
  constructor(private router: Router, private userService: UserService) { }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: (arg) => this.handleDateClick(arg),
    events: this.events,
    datesSet: (arg) => this.updateEvents(arg.start, arg.end)
  };

  ngOnInit(): void {
      if (this.userID) {
        this.userService.getUserInfo(this.userID).subscribe({
          next: (data: UserScheme) => {
            this.userData = data.user;
          },
          error: (error: Error) => {
            console.error(`Error fetching data:`, error)
          },
          complete: () => {
            setTimeout(() => {
              const calendarApi = this.calendarComponent?.getApi();
              if (calendarApi) {
                const currentRange = calendarApi.view;
                this.updateEvents(currentRange.activeStart, currentRange.activeEnd);
              }
            });
          }
        })
      }  
    }

  handleDateClick(arg: any) {
    this.userService.getTasksByDate(this.userID, arg.dateStr).subscribe({
      next: (tasks) => {
        return tasks
      },
      error: (error) => {
        console.error('Error while obtaining tasks: ', error);
      }
    });
    this.selectedDate = new Date(arg.dateStr);
    if (this.userData?.tasks) {
      this.tasksForSelectedDate = this.userData.tasks.filter(
        (task) =>
          new Date(task.deadLine).toDateString() === this.selectedDate?.toDateString()
      );
    }
    this.showTasks = true;
  }

  updateEvents(startDate: Date, endDate: Date) {
    if (this.userData && this.userData.tasks) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      this.events = this.userData.tasks.filter(task => {
        const taskDate = new Date(task.deadLine);
        taskDate.setHours(0, 0, 0, 0);
        return taskDate >= startDate && taskDate <= endDate;
      }).map(task => ({
        title: task.taskName,
        start: task.deadLine,
        color: new Date(task.deadLine).setHours(0, 0, 0, 0) < today.getTime() ? '#808080' : '#ff0000'
      }));

      this.calendarOptions.events = this.events;
    }
  }

  taskCreatorRedirect(): void {
    this.router.navigate(['/task-form'])
  }

  closeTaskView() {
    this.showTasks = false;
    this.selectedDate = null;
    this.tasksForSelectedDate = [];
  }

}
