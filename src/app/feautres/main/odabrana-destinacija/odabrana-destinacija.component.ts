import { Component, OnInit } from '@angular/core';
import { Article } from '../../models/article.model';
import { Activity } from '../../models/aktivnost.model';
import { Destination } from '../../models/destination.model';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { AktivnostiService } from '../../services/aktivnosti.service';
import { DestinationService } from '../../services/destination.service';

@Component({
  selector: 'app-odabrana-destinacija',
  templateUrl: './odabrana-destinacija.component.html',
  styleUrls: ['./odabrana-destinacija.component.scss'],
})
export class OdabranaDestinacijaComponent implements OnInit {
  articles: Article[] = [];
  activityId!: number;
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
    this.getDestinacija();
  }

  private getArticleByAcitivty(): void {
    this.articleService
      .getArticlesByDestination(this.activityId)
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

  private getDestinacija() {
    this.destinacijeServis
      .getDestinacijaById(this.activityId)
      .subscribe((data) => {
        this.destination = data;
      });
  }
}
