import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl = 'http://localhost:3000/users'; // 'https://rnstmz00d9.execute-api.eu-west-3.amazonaws.com/dev/users'

  constructor(private http: HttpClient) { }

  register(userData: any): Observable<any> {
    const headers = new HttpHeaders({'Content-type': 'application/json'});
    return this.http.post<any>(this.apiUrl, userData,  { headers }).pipe(
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
