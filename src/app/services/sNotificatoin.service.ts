import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class sNotification {
  constructor(private snackBar: MatSnackBar) { }

  showNotification(message: string, action: string, duration: number = 3000) {
    const config = new MatSnackBarConfig();
    config.verticalPosition = 'top';
    config.horizontalPosition = 'center';
    config.duration = duration;

    this.snackBar.open(message, action, config);
  }
}