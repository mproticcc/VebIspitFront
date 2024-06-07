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
export class IsAdminGuard implements CanActivate, CanLoad {
  constructor(private route: Router, private authorization: AuthService) {}

  canActivate(): boolean {
    return this.isUserAdmin();
  }

  canLoad(): boolean {
    return this.isUserAdmin();
  }

  private isUserAdmin(): boolean {
    if (this.authorization.isAdmin()) {
      return true;
    }
    this.route.navigateByUrl('');
    return false;
  }
}
