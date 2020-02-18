import { Component } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { HttpCancelService } from './services/http-cancel.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-8-bookstore-demo';

  constructor(
    private router: Router,
    private httpCancelService: HttpCancelService
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof ActivationEnd) {
        this.httpCancelService.cancelPendingRequests();
      }
    });
  }
}
