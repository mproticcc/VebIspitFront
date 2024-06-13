import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/login';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email, password });
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAdmin(): boolean {
    const token = localStorage.getItem('token');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const decodedToken: any = this.jwtHelper.decodeToken(token);
      if (decodedToken.tip == 'admin') return true;
    }
    return false;
  }

  isLogged(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  getUserName(): string {
    const token = localStorage.getItem('token');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const decodedToken: any = this.jwtHelper.decodeToken(token);
      return decodedToken.ime;
    }
    return 'Greska';
  }

  getUserId(): number {
    const token = localStorage.getItem('token');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const decodedToken: any = this.jwtHelper.decodeToken(token);
      return decodedToken.userId;
    }
    return 0;
  }
}
