import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class IsLoggedGuard implements CanActivate, CanLoad {
  constructor(private route: Router, private authorization: AuthService) {}

  canActivate(): boolean {
    return this.isUserLoggedIn();
  }
  canLoad(): boolean {
    return this.isUserLoggedIn();
  }

  private isUserLoggedIn(): boolean {
    if (this.authorization.isLogged()) {
      return true;
    }
    this.route.navigateByUrl('');
    return false;
  }
}
