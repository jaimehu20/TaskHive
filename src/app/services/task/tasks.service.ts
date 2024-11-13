import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../../interfaces/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private apiUrl = 'https://r1cw49ruc7.execute-api.eu-west-3.amazonaws.com/dev/tasks'; // 'http://localhost:3000/tasks'

  constructor(private http: HttpClient) { }

  addTask(userID: string, task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${userID}`
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('authTOKEN')}`
    });
    return this.http.post<Task>(url, task, { headers })
  }

  editTask(userID: string | null, taskID: string, task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${userID}/${taskID}`
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('authTOKEN')}`
    });
    return this.http.patch<Task>(url, task, { headers } )
  }

  deleteTask(userID: string | null, taskID: string): Observable<Task> {
    const url = `${this.apiUrl}/${userID}/${taskID}`
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('authTOKEN')}`
    });
    return this.http.delete<Task>(url, { headers })
  }
}
