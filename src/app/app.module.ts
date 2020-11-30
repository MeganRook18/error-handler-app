import { BrowserModule } from "@angular/platform-browser";
import { NgModule, ErrorHandler } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

// angular material
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

// components
import { AppComponent } from "./app.component";
import { ErrorHandlerDialogComponent } from "./components/error-handler-dialog/error-handler-dialog.component";

// providers
import { GlobalErrorHandler } from "./global-error-handler";
import { ServerErrorInterceptor } from "./server-error.interceptor";

const routes: Routes = [];

@NgModule({
  declarations: [AppComponent, ErrorHandlerDialogComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    MatDialogModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
