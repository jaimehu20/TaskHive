import { Component } from '@angular/core';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';


@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [NavBarComponent, FullCalendarModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {

  userID: string | any = localStorage.getItem('userID');
  prueba: any = null;

  constructor(private router: Router, private userService: UserService) { }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: (arg) => this.handleDateClick(arg)
  };

  handleDateClick(arg: any) {
    this.userService.getTasksByDate(this.userID, arg.dateStr).subscribe({
      next: (tasks) => {
        console.log('Tareas obtenidas para la fecha seleccionada:', tasks);
        alert('La fecha seleccionada es: ' + arg.dateStr);
      },
      error: (error) => {
        console.error('Error al obtener tareas:', error);
        alert('Hubo un error al obtener las tareas. Revisa la consola para más detalles.');
      }
    });
  }

  taskCreatorRedirect(): void {
    this.router.navigate(['/task-form'])
  }

}
