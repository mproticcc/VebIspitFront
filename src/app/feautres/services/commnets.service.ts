import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from '../models/kometar.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommnetsService {
  private apiUrl = 'http://localhost:8080/komentari';

  constructor(private http: HttpClient) {}

  getKomentar(id: number): Observable<Comment[]> {
    return this.http
      .get<Comment[]>(`${this.apiUrl}/${id}`)
      .pipe(
        map((comments) =>
          comments.sort(
            (a, b) =>
              new Date(b.datumKreiranja).getTime() -
              new Date(a.datumKreiranja).getTime()
          )
        )
      );
  }

  kreirajNoviKomentar(noviKomentar: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, noviKomentar);
  }
}
