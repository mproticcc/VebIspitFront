import { User } from './../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-svi-korisnici',
  templateUrl: './svi-korisnici.component.html',
  styleUrls: ['./svi-korisnici.component.scss'],
})
export class SviKorisniciComponent implements OnInit {
  users!: User[];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe((users) => (this.users = users));
  }

  toggleStatus(user: User): void {
    this.userService.toggleStatus(user).subscribe((updatedUser) => {
      // Find index of updated user in users array
      const index = this.users.findIndex((u) => u.id === updatedUser.id);
      // Update user status in users array
      if (index !== -1) {
        this.users[index].status = updatedUser.status;
      }
    });
  }

  // Implement other methods such as deleteUser, editUser, etc. if needed
}
