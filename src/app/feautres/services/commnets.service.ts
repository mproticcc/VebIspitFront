import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from '../models/kometar.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommnetsService {
  private apiUrl = 'http://localhost:8080/komentari';

  constructor(private http: HttpClient) {}

  getKomentar(id: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/${id}`);
  }
}
