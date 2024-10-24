import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/users' // 'https://kfh1182ty0.execute-api.eu-west-3.amazonaws.com/dev/users';

  constructor(private http: HttpClient) { }

  getUserInfo(userID: string): Observable<any> {
    const url = `${this.apiUrl}/${userID}`
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('authTOKEN')}`
    });

    return this.http.get<any>(url, { headers });
  }
}
