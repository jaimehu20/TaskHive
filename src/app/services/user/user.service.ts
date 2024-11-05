import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userInfo: any

  private apiUrl = 'http://localhost:3000/users';  // 'https://rnstmz00d9.execute-api.eu-west-3.amazonaws.com/dev/users'

  constructor(private http: HttpClient) { }

  getUserInfo(userID: string): Observable<any> {
    const url = `${this.apiUrl}/${userID}`
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('authTOKEN')}`
    });

    return this.http.get<any>(url, { headers });
  }

  setUserInfo(info: any) {
    this.userInfo = info
  }

  getInfo() {
    return this.userInfo
  }

}
