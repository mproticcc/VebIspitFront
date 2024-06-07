import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article.model';

@Component({
  selector: 'app-svi-clanci',
  templateUrl: './svi-clanci.component.html',
  styleUrls: ['./svi-clanci.component.scss'],
})
export class SviClanciComponent implements OnInit {
  articles!: Article[];

  constructor(private router: Router, private articleService: ArticleService) {}

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles(): void {
    this.articleService
      .getArticles()
      .subscribe((articles) => (this.articles = articles));
  }

  editArticle(articleId: number): void {
    this.router.navigate(['/edit-article', articleId]);
  }

  deleteArticle(articleId: number): void {
    this.articleService.deleteClanak(articleId).subscribe(() => {
      this.getArticles();
    });
  }

  addArticle(): void {
    this.router.navigate(['/add-article']);
  }
}
