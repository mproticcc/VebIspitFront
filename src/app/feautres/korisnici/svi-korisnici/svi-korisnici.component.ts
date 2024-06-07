import { User } from './../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-svi-korisnici',
  templateUrl: './svi-korisnici.component.html',
  styleUrls: ['./svi-korisnici.component.scss'],
})
export class SviKorisniciComponent implements OnInit {
  users!: User[];

  constructor(private userService: UserService, private route: Router) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe((users) => (this.users = users));
  }

  aktivirajKorisnika(user: User): void {
    this.userService.aktivirajKorisnika(user).subscribe();
  }

  deaktivirajKornsnika(user: User): void {
    this.userService.deaktivirajKorisnika(user).subscribe();
  }
}
