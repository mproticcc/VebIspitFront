import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Activity } from '../models/aktivnost.model';

@Injectable({
  providedIn: 'root',
})
export class AktivnostiService {
  private apiUrl = 'http://localhost:8080/aktivnosti';

  constructor(private http: HttpClient) {}

  getAktivnostiByClanakId(clanakId: number): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${this.apiUrl}/clanak/${clanakId}`);
  }

  getAktivnost(id: number): Observable<Activity> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Activity>(url);
  }
}
