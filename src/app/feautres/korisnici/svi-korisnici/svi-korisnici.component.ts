import { User } from './../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditKorisnikDialogComponent } from '../edit-korisnik-dialog/edit-korisnik-dialog.component';

@Component({
  selector: 'app-svi-korisnici',
  templateUrl: './svi-korisnici.component.html',
  styleUrls: ['./svi-korisnici.component.scss'],
})
export class SviKorisniciComponent implements OnInit {
  users!: User[];

  constructor(
    private userService: UserService,
    private route: Router,
    private dialog: MatDialog
  ) {}

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
  editUser(user: User): void {
    this.dialog.open(EditKorisnikDialogComponent, {
      data: {
        title: 'Edit User',
        user: user,
      },
      position: { top: '40px' },
      width: '50%',
      height: '85%',
    });
  }

  createUser(): void {
    this.dialog.open(EditKorisnikDialogComponent, {
      data: {
        title: 'Add User',
      },
      position: { top: '40px' },
      width: '50%',
      height: '85%',
    });
  }
}
