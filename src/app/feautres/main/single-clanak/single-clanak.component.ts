import { Component, OnInit } from '@angular/core';
import { Article } from '../../models/article.model';
import { Comment } from '../../models/kometar.model';
import { Activity } from '../../models/aktivnost.model';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../services/article.service';

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
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.getArticle();
  }

  getArticle(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.articleService.getArticle(id).subscribe((article) => {
      this.article = article;
      this.incrementArticleViews(); // Inkrementiranje broja poseta članku
      this.getActivities(); // Dohvatanje aktivnosti vezanih za članak
      this.getComments(); // Dohvatanje komentara vezanih za članak
    });
  }

  getActivities(): void {
    // Implementirajte logiku za dohvatanje aktivnosti vezanih za članak
  }

  getComments(): void {
    // Implementirajte logiku za dohvatanje komentara vezanih za članak
  }

  getAuthorName(authorId: number): string {
    // Implementirajte logiku za dobijanje imena autora na osnovu ID-a
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

  incrementArticleViews(): void {
    // Implementirajte logiku za inkrementiranje broja poseta članku
    // this.articleService.incrementArticleViews(this.article.id).subscribe(() => {
    //   // Broj poseta je uspešno inkrementiran
    // });
  }
}
