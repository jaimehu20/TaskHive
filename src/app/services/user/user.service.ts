import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserScheme } from '../../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userInfo: User | null = null

  private apiUrl = 'https://wj7xhy77ti.execute-api.eu-west-3.amazonaws.com/dev/users';  // 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  getUserInfo(userID: string | null): Observable<UserScheme> {
    const url = `${this.apiUrl}/${userID}`
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('authTOKEN')}`
    });

    return this.http.get<UserScheme>(url, { headers });
  }

  setUserInfo(info: User) {
    this.userInfo = info
  }

  getInfo() {
    return this.userInfo
  }

}