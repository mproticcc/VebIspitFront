import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DestinationService } from '../../services/destination.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Destination } from '../../models/destination.model';

@Component({
  selector: 'app-edit-destinacije-dialog',
  templateUrl: './edit-destinacije-dialog.component.html',
  styleUrls: ['./edit-destinacije-dialog.component.scss'],
})
export class EditDestinacijeDialogComponent implements OnInit {
  destinationForm!: FormGroup;
  isEditMode: boolean = false;
  destinationId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private destinationService: DestinationService,
    private dialogRef: MatDialogRef<EditDestinacijeDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { title: string; destinacija: Destination }
  ) {}

  ngOnInit(): void {
    this.initForm();
    if (this.data.title === 'Edit Destination') {
      this.destinationId = this.data.destinacija.id;
      this.populateForm(this.data.destinacija);
    }
  }

  initForm(): void {
    this.destinationForm = this.formBuilder.group({
      ime: ['', Validators.required],
      opis: ['', Validators.required],
    });
  }

  populateForm(destinacija: Destination): void {
    this.destinationForm.patchValue({
      ime: destinacija.ime,
      opis: destinacija.opis,
    });
  }

  updateDestination(): void {
    if (this.destinationForm.invalid) {
      return;
    }
    const destinationData = this.destinationForm.value;
    this.destinationService
      .updateDestination(this.destinationId, destinationData)
      .subscribe(() => {
        this.router.navigate(['main/destinacije']);
        this.dialogRef.close();
      });
  }

  addDestinacija(): void {
    if (this.destinationForm.invalid) {
      return;
    }
    const destinationData = this.destinationForm.value;
    this.destinationService.createDestination(destinationData).subscribe(() => {
      this.router.navigate(['main/destinacije']);
      this.dialogRef.close();
    });
  }
}
