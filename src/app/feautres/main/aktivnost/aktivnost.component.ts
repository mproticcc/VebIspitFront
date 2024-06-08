import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article.model';

@Component({
  selector: 'app-aktivnost',
  templateUrl: './aktivnost.component.html',
  styleUrls: ['./aktivnost.component.scss'],
})
export class AktivnostComponent implements OnInit {
  articles: Article[] = [];
  activityId!: number;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.activityId = +this.route.snapshot.paramMap.get('id')!;
    this.articleService
      .getArticlesByActivity(this.activityId)
      .subscribe((articles) => {
        this.articles = articles;
      });
  }
}
