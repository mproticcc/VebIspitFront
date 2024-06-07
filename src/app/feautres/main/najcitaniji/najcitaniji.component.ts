import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article.model';
import { Destination } from '../../models/destination.model';
import { DestinationService } from '../../services/destination.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-najcitaniji',
  templateUrl: './najcitaniji.component.html',
  styleUrls: ['./najcitaniji.component.scss'],
})
export class NajcitanijiComponent implements OnInit {
  articles: Article[] = [];
  mostReadArticles: Article[] = [];
  destinations!: Destination[];

  constructor(
    private articleService: ArticleService,
    private destinationService: DestinationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getArticles();
    this.getDestinations();
  }

  getArticles(): void {
    this.articleService.getArticles().subscribe((articles) => {
      this.articles = articles;
      this.getMostReadArticles();
    });
  }
  getDestinations(): void {
    this.destinationService
      .getDestinations()
      .subscribe((destinations) => (this.destinations = destinations));
  }

  getMostReadArticles(): void {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentArticles = this.articles.filter(
      (article) => new Date(article.datumKreiranja) >= thirtyDaysAgo
    );

    this.mostReadArticles = recentArticles
      .sort((a, b) => b.brojPoseta - a.brojPoseta)
      .slice(0, 10);
  }

  // getDestinacija(destinacijaId: number): string {
  //   const destinacija = this.destinations.find(
  //     (dest) => dest.id === destinacijaId
  //   );
  //   return destinacija ? destinacija.ime : 'Nepoznato';
  // }
}
