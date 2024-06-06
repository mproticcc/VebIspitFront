import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-forma',
  templateUrl: './forma.component.html',
  styleUrls: ['./forma.component.scss'],
})
export class FormaComponent implements OnInit {
  articleForm!: FormGroup;
  isEditMode: boolean = false;
  articleId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.articleId = +params['id'];
        // Fetch article details and set them to the form for editing
        // Implement this logic based on your backend API
      }
    });
  }

  initForm(): void {
    this.articleForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      content: ['', Validators.required],
      destination: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.articleForm.invalid) {
      return;
    }

    const articleData = this.articleForm.value;

    if (this.isEditMode) {
      // Update article
      this.articleService.updateArticle(this.articleId, articleData).subscribe(
        () => {
          // Handle success
          this.router.navigate(['/articles']);
        },
        (error) => {
          console.error('Error:', error);
          // Handle error
        }
      );
    } else {
      // Create new article
      this.articleService.createArticle(articleData).subscribe(
        () => {
          // Handle success
          this.router.navigate(['/articles']);
        },
        (error) => {
          console.error('Error:', error);
          // Handle error
        }
      );
    }
  }
}
