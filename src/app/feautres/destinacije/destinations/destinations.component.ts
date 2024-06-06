import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DestinationService } from '../../services/destination.service';
import { Destination } from '../../models/destination.model';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.scss'],
})
export class DestinationsComponent implements OnInit {
  destinations!: Destination[];

  constructor(
    private router: Router,
    private destinationService: DestinationService
  ) {}

  ngOnInit(): void {
    this.getDestinations();
  }

  getDestinations(): void {
    this.destinationService
      .getDestinations()
      .subscribe((destinations) => (this.destinations = destinations));
  }

  goToDestinationArticles(destinationName: string): void {
    this.router.navigate(['/articles', destinationName]);
  }

  editDestination(destinationId: number): void {
    this.router.navigate(['/destinationForm', destinationId]);
  }

  deleteDestination(destinationId: number): void {
    // Implement delete functionality here
  }

  addDestination(): void {
    this.router.navigate(['/destinationForm']);
  }
}
