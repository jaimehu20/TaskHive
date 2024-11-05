import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/login';  // 'https://rnstmz00d9.execute-api.eu-west-3.amazonaws.com/dev/login';

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(this.apiUrl, { email, password }, { headers }).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem('authTOKEN', response.token);
          localStorage.setItem('userID', response.id)
        }
      }),
      catchError(err => {
        console.error('Login error: ', err);
        return of(err)
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authTOKEN');
  }

  redirectToDashboardIfLoggedIn() {
    if (this.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  logout() {
    localStorage.removeItem('authTOKEN');
    this.router.navigate(['/login']);
  }
}