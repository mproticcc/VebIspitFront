import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DestinationService } from '../../services/destination.service';
import { Destination } from '../../models/destination.model';
import { MatDialog } from '@angular/material/dialog';
import { EditDestinacijeDialogComponent } from '../edit-destinacije-dialog/edit-destinacije-dialog.component';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.scss'],
})
export class DestinationsComponent implements OnInit {
  destinations!: Destination[];

  constructor(
    private router: Router,
    private destinationService: DestinationService,
    private dialog: MatDialog
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

  editDestination(destination: Destination): void {
    this.dialog.open(EditDestinacijeDialogComponent, {
      data: {
        title: 'Edit Destination',
        destinacija: destination,
      },
      position: { top: '40px' },
      width: '50%',
      height: '50%',
    });
  }

  deleteDestination(destinationId: number): void {
    this.destinationService.deleteDestinacija(destinationId).subscribe(() => {
      this.getDestinations();
    });
  }

  addDestination(): void {
    this.dialog.open(EditDestinacijeDialogComponent, {
      data: {
        title: 'Add Destination',
      },
      position: { top: '40px' },
      width: '50%',
      height: '50%',
    });
  }
}
