import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article.model';
import { EditClanciDialogComponent } from '../edit-clanci-dialog/edit-clanci-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-svi-clanci',
  templateUrl: './svi-clanci.component.html',
  styleUrls: ['./svi-clanci.component.scss'],
})
export class SviClanciComponent implements OnInit {
  articles!: Article[];
  user!: User[];

  constructor(
    private articleService: ArticleService,
    private dialog: MatDialog,
    private notification: NotificationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles(): void {
    this.articleService.getArticles().subscribe((articles) => {
      this.articles = articles;
      this.articles.forEach((el) => {
        this.userService.getUsersById(el.autorId).subscribe((data) => {
          el.imeAutora = data.ime;
        });
      });
    });
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
      this.notification.snackbarNotification(
        `Clanak uspesno obrisan!`,
        'Close',
        'center',
        'top',
        4000
      );
    });
  }
}
