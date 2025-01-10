import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { Preferences } from '../../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {

  private apiUrl = 'https://cp393i64p7.execute-api.eu-west-3.amazonaws.com/dev/' ; //  'http://localhost:3000' ;
  private profileImageSubject = new BehaviorSubject<string | null>(null);
  profileImage$ = this.profileImageSubject.asObservable();
  constructor(private http: HttpClient) { }

  updatePreferences(userID: string, preferences: Preferences | null): Observable<Preferences> {
    const url = `${this.apiUrl}/first-steps/${userID}`
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('authTOKEN')}`
    });
    return this.http.patch<Preferences>(url, preferences, { headers })
  }

  uploadProfileImage(userID: string, file: File): Observable<any> {
    const url = `${this.apiUrl}upload-profile-image/${userID}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('authTOKEN')}`
    })
    const formData = new FormData();
    formData.append('profileImage', file);

    return this.http.post(url, formData, { headers });
  }

  updateProfileImage(newUrl: string):void {
    this.profileImageSubject.next(newUrl)
  }
}