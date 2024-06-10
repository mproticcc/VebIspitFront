import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Article } from '../../models/article.model';
import { DestinationService } from '../../services/destination.service';
import { Destination } from '../../models/destination.model';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-edit-clanci-dialog',
  templateUrl: './edit-clanci-dialog.component.html',
  styleUrls: ['./edit-clanci-dialog.component.scss'],
})
export class EditClanciDialogComponent implements OnInit {
  articleForm!: FormGroup;
  isEditMode: boolean = false;
  articleId!: number;
  destinations!: Destination[];
  selectedDestinationId: number = -1;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private articleService: ArticleService,
    private destinationService: DestinationService,
    private authService: AuthService,
    private dialogRef: MatDialogRef<EditClanciDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { title: string; clanak: Article }
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getAllDestinations();
    if (this.data.title == 'Edit Clanak') {
      this.articleId = this.data.clanak.id;
      this.populateForm(this.data.clanak);
    }
  }
  onSelect(destinationId: any) {
    this.selectedDestinationId = destinationId.value;
  }

  initForm(): void {
    this.articleForm = this.formBuilder.group({
      naslov: ['', Validators.required],
      tekst: ['', Validators.required],
      destinacija_id: ['', Validators.required],
    });
  }

  populateForm(clanak: Article): void {
    this.articleForm.patchValue({
      naslov: clanak.naslov,
      tekst: clanak.tekst,
      destinacija_id: clanak.destinacijaId,
    });
  }

  updateClanak(): void {
    if (this.articleForm.invalid) {
      return;
    }
    if (this.selectedDestinationId == -1) {
      this.selectedDestinationId = this.data.clanak.destinacijaId;
    }
    const clanakData = {
      ...this.articleForm.value,
      destinacijaId: Number(this.selectedDestinationId),
    };
    this.articleService
      .updateArticle(this.articleId, clanakData)
      .subscribe(() => {
        this.router.navigate(['main/clanci']);
        this.dialogRef.close();
      });
  }

  addClanak(): void {
    if (this.articleForm.invalid) {
      return;
    }
    const today = new Date();
    const timestamp = today.toISOString();
    const clanakData = {
      ...this.articleForm.value,
      datumKreiranja: timestamp,
      broj_poseta: 0,
      autorId: this.authService.getUserId(),
      destinacijaId: this.selectedDestinationId,
    };
    this.articleService.createArticle(clanakData).subscribe(() => {
      this.router.navigate(['main/clanci']);
      this.dialogRef.close();
    });
  }

  private getAllDestinations(): void {
    this.destinationService.getDestinations().subscribe((data) => {
      this.destinations = data;
    });
  }
}
