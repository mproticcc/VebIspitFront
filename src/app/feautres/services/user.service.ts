import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/korisnici';

  private apiUrlAD = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  aktivirajKorisnika(user: User): Observable<User> {
    const url = `${this.apiUrlAD}/aktiviraj/${user.id}`;
    return this.http.get<User>(url);
  }

  deaktivirajKorisnika(user: User): Observable<User> {
    const url = `${this.apiUrlAD}/deaktiviraj/${user.id}`;
    return this.http.get<User>(url);
  }

  updateUser(id: number, user: User): Observable<User> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<User>(url, user);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }
}
