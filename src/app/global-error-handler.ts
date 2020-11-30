import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { NotificationService } from './services/notification.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  /**
   * Error handling is essential so it gets loaded first.
   * Because of this, we cant use dependency injection in the
   * constructor for the services. Instead, we have to inject
   * them manually with Injector.
   */

  constructor(private injector: Injector) {}

  handleError(error: Error | HttpErrorResponse) {
    const notifier = this.injector.get(NotificationService);
    let message: string;
    if (error instanceof HttpErrorResponse) {
      // Serve error
      notifier.openServerErrorDialog(error.message);
    } else {
      // client error
      message = error.message ? error.message : error.toString();
      notifier.showClientError(message);
    }
    // log every error to the console
    console.error(message);
  }
}
