import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Preferences } from '../../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {

  private apiUrl = 'http://localhost:3000/first-steps'; //  'https://rnstmz00d9.execute-api.eu-west-3.amazonaws.com/dev/first-steps';

  constructor(private http: HttpClient) { }

  updatePreferences(userID: string, preferences: Preferences | null): Observable<Preferences> {
    const url = `${this.apiUrl}/${userID}`
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('authTOKEN')}`
    });
    return this.http.patch<Preferences>(url, preferences, { headers })
  }
}
