import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private apiUrl = 'http://localhost:3000/tasks'

  constructor(private http: HttpClient) { }

  addTask(userID: string, task: any) {
    const url = `${this.apiUrl}/${userID}`
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('authTOKEN')}`
    });
    return this.http.post<any>(url, task, { headers })
  }
}
