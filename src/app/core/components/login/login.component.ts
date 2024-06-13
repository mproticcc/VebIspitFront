import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import * as CryptoJS from 'crypto-js';
import { NotificationService } from 'src/app/feautres/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage!: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private notification: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);

    this.authService.login(email, hashedPassword).subscribe(
      (data: any) => {
        if (data) {
          localStorage.setItem('token', data);
          this.router.navigate(['/main/destinacije']);
          this.notification.snackbarNotification(
            `Dobrodosao!`,
            'Close',
            'center',
            'top',
            4000
          );
        }
      },
      (error: any) => {
        this.notification.snackbarNotification(
          `Greska!`,
          'Close',
          'center',
          'top',
          4000
        );
      }
    );
  }
}
