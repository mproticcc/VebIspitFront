import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent implements OnInit {
  isAdmin: boolean = false;
  isLogged: boolean = false;
  userName!: string;

  constructor(private authService: AuthService, private route: Router) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.isLogged = this.authService.isLogged();
    this.userName = this.authService.getUserName();
  }

  logout(): void {
    this.authService.logout();
    this.route.navigateByUrl('');
    this.ngOnInit();
  }
}
