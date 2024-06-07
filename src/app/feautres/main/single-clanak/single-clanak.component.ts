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

  id: number = 0;

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
    this.id = id;
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

  addComment(): void {
    if (this.newCommentName && this.newCommentText) {
      let newComment: Comment = {
        ime_autora: this.newCommentName,
        tekst: this.newCommentText,
        datumKreiranja: new Date(),
        id: 0,
        clanakId: this.id,
      };
      this.commnetsService.kreirajNoviKomentar(newComment).subscribe(() => {
        this.getComments(this.id);
      });
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
