import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Preferences } from '../../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {

  private apiUrl = 'https://r1cw49ruc7.execute-api.eu-west-3.amazonaws.com/dev'; // 'http://localhost:3000' ;

  constructor(private http: HttpClient) { }

  updatePreferences(userID: string, preferences: Preferences | null): Observable<Preferences> {
    const url = `${this.apiUrl}/first-steps/${userID}`
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('authTOKEN')}`
    });
    return this.http.patch<Preferences>(url, preferences, { headers })
  }

  uploadProfileImage(userID: string, file: File): Observable<any> {
    const url = `${this.apiUrl}/upload-profile-image/${userID}`
    const formData = new FormData();
    formData.append('profileImage', file);
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('authTOKEN')}`
    });
    
    return this.http.post(url, formData, { headers })
  }

  getProfileImage(avatarID: string): Observable<Blob> {
    const url = `${this.apiUrl}/profile-image/${avatarID}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('authTOKEN')}`
    });

    return this.http.get(url, { responseType: 'blob', headers })
  }
}
