import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private _snackBar: MatSnackBar) {}

  snackbarNotification(
    message: string,
    buttonText: string,
    hPosition: MatSnackBarHorizontalPosition,
    vPosition: MatSnackBarVerticalPosition,
    time: number
  ): void {
    this._snackBar.open(message, buttonText, {
      horizontalPosition: hPosition,
      duration: time,
      verticalPosition: vPosition,
      panelClass: ['snackbar-style'],
    });
  }
}
