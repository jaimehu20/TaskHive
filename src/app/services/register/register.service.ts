import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl =  'http://localhost:3000/users' // 'https://kfh1182ty0.execute-api.eu-west-3.amazonaws.com/dev/users';

  constructor(private http: HttpClient) { }

  register(userData: any): Observable<any> {
    const headers = new HttpHeaders({'Content-type': 'application/json'});
    return this.http.post<any>(this.apiUrl, userData,  { headers }).pipe(
      tap(response => {
        if (response) {
          console.log('Succesful registration:', response)
        }
      }),
      catchError(error => {
        const errorMessage = error.error.message || 'Registration error';
        return throwError(() => new Error(errorMessage));
      })
    )
  }
}
