import { Injectable, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ErrorHandlerDialogComponent } from '../components/error-handler-dialog/error-handler-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private zone: NgZone
  ) {}

  showClientError(message: string): void {
    // The snackbar or dialog won't run outside the Angular's zone.
    // Wrapping it in the run method fixes this issue.
    this.zone.run(() => {
      this.snackbar.open(`Error: ${message}`, 'Okay', {
        panelClass: ['error-snack'], // add a class to snackbar to add custom styles
      });
    });
  }

  openServerErrorDialog(message: string) {
    this.zone.run(() => {
      this.dialog.open(ErrorHandlerDialogComponent, {
        data: { message },
      });
    });
  }

  showNonErrorSnackBar(message: string, duration = 6000) {
    this.snackbar.open(message, 'Okay', {
      panelClass: ['non-error-snack'],
      duration,
    });
  }
}
