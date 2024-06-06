import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DestinationService } from '../../services/destination.service';

@Component({
  selector: 'app-forma',
  templateUrl: './forma.component.html',
  styleUrls: ['./forma.component.scss'],
})
export class FormaComponent implements OnInit {
  destinationForm!: FormGroup;
  isEditMode: boolean = false;
  destinationId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private destinationService: DestinationService
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.destinationId = +params['id'];
        // Fetch destination details and set them to the form for editing
        // Implement this logic based on your backend API
      }
    });
  }

  initForm(): void {
    this.destinationForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.destinationForm.invalid) {
      return;
    }

    const destinationData = this.destinationForm.value;

    if (this.isEditMode) {
      // Update destination
      this.destinationService
        .updateDestination(this.destinationId, destinationData)
        .subscribe(
          () => {
            // Handle success
            this.router.navigate(['/destinations']);
          },
          (error) => {
            console.error('Error:', error);
            // Handle error
          }
        );
    } else {
      // Create new destination
      this.destinationService.createDestination(destinationData).subscribe(
        () => {
          // Handle success
          this.router.navigate(['/destinations']);
        },
        (error) => {
          console.error('Error:', error);
          // Handle error
        }
      );
    }
  }
}
