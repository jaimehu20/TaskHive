import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { User, UserScheme } from '../../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl = 'https://wj7xhy77ti.execute-api.eu-west-3.amazonaws.com/dev/users' ; // 'http://localhost:3000/users'

  constructor(private http: HttpClient) { }

  register(userData: User): Observable<UserScheme> {
    const headers = new HttpHeaders({'Content-type': 'application/json'});
    return this.http.post<UserScheme>(this.apiUrl, userData,  { headers }).pipe(
      tap(response => {
        if (response) {
          return
        }
      }),
      catchError(error => {
        const errorMessage = error.error.message || 'Registration error';
        return throwError(() => new Error(errorMessage));
      })
    )
  }
}
