import { CommnetsService } from './../../services/commnets.service';
import { Component, OnInit } from '@angular/core';
import { Article } from '../../models/article.model';
import { Comment } from '../../models/kometar.model';
import { Activity } from '../../models/aktivnost.model';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { AktivnostiService } from '../../services/aktivnosti.service';

@Component({
  selector: 'app-single-clanak',
  templateUrl: './single-clanak.component.html',
  styleUrls: ['./single-clanak.component.scss'],
})
export class SingleClanakComponent implements OnInit {
  article!: Article;
  activities!: Activity[];
  comments: Comment[] = [];
  newCommentName!: string;
  newCommentText!: string;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private commnetsService: CommnetsService,
    private aktivnostiService: AktivnostiService
  ) {}

  ngOnInit(): void {
    this.getArticle();
  }

  getArticle(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.articleService.getArticle(id).subscribe((article) => {
      this.article = article;
      this.incrementVisitCount(id);
      this.getActivities(id);
      this.getComments(id);
    });
  }

  getActivities(id: number): void {
    this.aktivnostiService
      .getAktivnostiByClanakId(id)
      .subscribe((activities) => {
        this.activities = activities;
      });
  }

  getComments(id: number): void {
    this.commnetsService.getKomentar(id).subscribe((comments) => {
      this.comments = comments;
    });
  }

  getAuthorName(authorId: number): string {
    return 'prota';
  }

  addComment(): void {
    if (this.newCommentName && this.newCommentText) {
      // const newComment: Comment = {
      //   imeAutora: this.newCommentName,
      //   tekst: this.newCommentText,
      //   datumKreiranja: new Date(),
      // };
      // Dodajte novi komentar u listu komentara
      // this.comments.unshift(newComment);
      // Implementirajte logiku za slanje novog komentara na server
      // this.articleService.addComment(this.article.id, newComment).subscribe(() => {
      //   // Ukoliko je slanje uspešno, možete osvežiti listu komentara
      //   this.getComments();
      // });
      // Resetujte forme za dodavanje komentara
      this.newCommentName = '';
      this.newCommentText = '';
    }
  }

  incrementVisitCount(id: number): void {
    this.articleService.incrementVisitCount(id).subscribe(() => {
      console.log('Visit count incremented successfully');
    });
  }
}
