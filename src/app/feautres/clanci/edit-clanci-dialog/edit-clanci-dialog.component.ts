import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Article } from '../../models/article.model';

@Component({
  selector: 'app-edit-clanci-dialog',
  templateUrl: './edit-clanci-dialog.component.html',
  styleUrls: ['./edit-clanci-dialog.component.scss'],
})
export class EditClanciDialogComponent implements OnInit {
  articleForm!: FormGroup;
  isEditMode: boolean = false;
  articleId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private articleService: ArticleService,
    private dialogRef: MatDialogRef<EditClanciDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { title: string; clanak: Article }
  ) {}

  ngOnInit(): void {
    this.initForm();
    if (this.data.title == 'Edit Clanak') {
      this.articleId = this.data.clanak.id;
      this.populateForm(this.data.clanak);
    }
  }

  initForm(): void {
    this.articleForm = this.formBuilder.group({
      naslov: ['', Validators.required],
      tekst: ['', Validators.required],
    });
  }

  populateForm(clanak: Article): void {
    this.articleForm.patchValue({
      naslov: clanak.naslov,
      tekst: clanak.tekst,
    });
  }

  updateDestination(): void {
    if (this.articleForm.invalid) {
      return;
    }
    const destinationData = {
      ...this.articleForm.value,
      autor_id: 11,
    };
    this.articleService
      .updateArticle(this.articleId, destinationData)
      .subscribe(() => {
        this.router.navigate(['main/destinacije']);
        this.dialogRef.close();
      });
  }

  addDestinacija(): void {
    if (this.articleForm.invalid) {
      return;
    }
    const destinationData = this.articleForm.value;
    this.articleService.createArticle(destinationData).subscribe(() => {
      this.router.navigate(['main/destinacije']);
      this.dialogRef.close();
    });
  }
}
