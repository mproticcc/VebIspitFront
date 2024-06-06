import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-forma',
  templateUrl: './forma.component.html',
  styleUrls: ['./forma.component.scss'],
})
export class FormaComponent implements OnInit {
  userForm!: FormGroup;
  isEditMode: boolean = false;
  userId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.userId = +params['id'];
        // Fetch user details and set them to the form for editing
        // Implement this logic based on your backend API
      }
    });
  }

  initForm(): void {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      userType: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      return;
    }

    const userData = this.userForm.value;

    if (this.isEditMode) {
      // Update user
      this.userService.updateUser(this.userId, userData).subscribe(
        () => {
          // Handle success
          this.router.navigate(['/users']);
        },
        (error) => {
          console.error('Error:', error);
          // Handle error
        }
      );
    } else {
      // Create new user
      this.userService.createUser(userData).subscribe(
        () => {
          // Handle success
          this.router.navigate(['/users']);
        },
        (error) => {
          console.error('Error:', error);
          // Handle error
        }
      );
    }
  }
}
