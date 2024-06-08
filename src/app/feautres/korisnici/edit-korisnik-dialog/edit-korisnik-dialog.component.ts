import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-edit-korisnik-dialog',
  templateUrl: './edit-korisnik-dialog.component.html',
  styleUrls: ['./edit-korisnik-dialog.component.scss'],
})
export class EditKorisnikDialogComponent implements OnInit {
  userForm!: FormGroup;
  userId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private dialogRef: MatDialogRef<EditKorisnikDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { title: string; user: User }
  ) {}

  ngOnInit(): void {
    this.initForm();
    if (this.data.title === 'Edit User') {
      this.userId = this.data.user.id;
      this.populateForm(this.data.user);
    }
  }

  initForm(): void {
    this.userForm = this.formBuilder.group({
      ime: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      prezime: ['', Validators.required],
      tip: ['', Validators.required],
      lozinka: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  populateForm(user: User): void {
    this.userForm.patchValue({
      ime: user.ime,
      email: user.email,
      prezime: user.prezime,
      tip: user.tip,
    });
  }

  updateUser(): void {
    if (this.userForm.invalid) {
      return;
    }

    const userData = {
      ...this.userForm.value,
      status: this.data.user.status,
    };
    this.userService.updateUser(this.userId, userData).subscribe(() => {
      this.router.navigate(['main/koricnici']);
      this.dialogRef.close();
    });
  }

  addUser(): void {
    if (this.userForm.invalid) {
      return;
    }
    const userData = {
      ...this.userForm.value,
      status: 'aktivan',
    };
    this.userService.createUser(userData).subscribe(() => {
      this.router.navigate(['main/koricnici']);
      this.dialogRef.close();
    });
  }
}
