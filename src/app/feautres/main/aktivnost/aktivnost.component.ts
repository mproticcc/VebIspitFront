import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article.model';
import { AktivnostiService } from '../../services/aktivnosti.service';
import { Activity } from '../../models/aktivnost.model';
import { DestinationService } from '../../services/destination.service';
import { Destination } from '../../models/destination.model';

@Component({
  selector: 'app-aktivnost',
  templateUrl: './aktivnost.component.html',
  styleUrls: ['./aktivnost.component.scss'],
})
export class AktivnostComponent implements OnInit {
  articles: Article[] = [];
  activityId!: number;
  activity!: Activity;
  destination!: Destination;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private aktivnostiService: AktivnostiService,
    private destinacijeServis: DestinationService
  ) {}

  ngOnInit(): void {
    this.activityId = +this.route.snapshot.paramMap.get('id')!;
    this.getArticleByAcitivty();
    this.getAktivnost();
  }

  private getArticleByAcitivty(): void {
    this.articleService
      .getArticlesByActivity(this.activityId)
      .subscribe((articles) => {
        this.articles = articles;
        this.articles.forEach((el) => {
          this.destinacijeServis
            .getDestinacijaById(el.destinacijaId)
            .subscribe((data) => {
              el.imeDestinacije = data.ime;
            });
        });
      });
  }

  private getAktivnost() {
    this.aktivnostiService.getAktivnost(this.activityId).subscribe((data) => {
      this.activity = data;
    });
  }
}
