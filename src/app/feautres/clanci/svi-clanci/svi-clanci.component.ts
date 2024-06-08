import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article.model';
import { EditClanciDialogComponent } from '../edit-clanci-dialog/edit-clanci-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-svi-clanci',
  templateUrl: './svi-clanci.component.html',
  styleUrls: ['./svi-clanci.component.scss'],
})
export class SviClanciComponent implements OnInit {
  articles!: Article[];

  constructor(
    private router: Router,
    private articleService: ArticleService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles(): void {
    this.articleService
      .getArticles()
      .subscribe((articles) => (this.articles = articles));
  }

  editArticle(clanak: Article): void {
    this.dialog.open(EditClanciDialogComponent, {
      data: {
        title: 'Edit Clanak',
        clanak: clanak,
      },
      position: { top: '40px' },
      width: '50%',
      height: '65%',
    });
  }

  addArticle(): void {
    this.dialog.open(EditClanciDialogComponent, {
      data: {
        title: 'Add Clanak',
      },
      position: { top: '40px' },
      width: '50%',
      height: '65%',
    });
  }

  deleteArticle(articleId: number): void {
    this.articleService.deleteClanak(articleId).subscribe(() => {
      this.getArticles();
    });
  }
}
