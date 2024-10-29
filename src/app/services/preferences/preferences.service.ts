import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {

  private apiUrl = 'http://localhost:3000/first-steps' // 'https://kfh1182ty0.execute-api.eu-west-3.amazonaws.com/dev/users';

  constructor(private http: HttpClient) { }

  updatePreferences(userID: string, preferences: any): Observable<any> {
    const url = `${this.apiUrl}/${userID}`
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('authTOKEN')}`
    });
    return this.http.patch<any>(url, preferences, { headers })
  }
}
