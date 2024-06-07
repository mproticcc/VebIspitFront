import { Component, OnInit } from '@angular/core';
import { Article } from '../../models/article.model';
import { ArticleService } from '../../services/article.service';
import { Destination } from '../../models/destination.model';
import { DestinationService } from '../../services/destination.service';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.scss'],
})
export class PocetnaComponent implements OnInit {
  articles!: Article[];

  destinations!: Destination[];

  constructor(
    private articleService: ArticleService,
    private destinationService: DestinationService
  ) {}

  ngOnInit(): void {
    this.getArticles();
    this.getDestinations();
  }

  getArticles(): void {
    this.articleService
      .getArticles()
      .subscribe((articles) => (this.articles = articles.slice(0, 10)));
  }

  getDestinations(): void {
    this.destinationService
      .getDestinations()
      .subscribe((destinations) => (this.destinations = destinations));
  }

  // Metoda za dobijanje imena destinacije na osnovu ID-a
  getDestinacija(destinacijaId: number): string {
    const destinacija = this.destinations.find(
      (dest) => dest.id === destinacijaId
    );
    return destinacija ? destinacija.ime : 'Nepoznato';
  }
}
