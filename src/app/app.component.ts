import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'error-handler-app';
  constructor(private http: HttpClient) {}
  throwClientError() {
    throw new Error('I am a client error');
  }
  throwServerError() {
    this.http.get('brokenURL').subscribe();
  }
}
