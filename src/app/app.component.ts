import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Smart Control';
  constructor(private router: Router) { }
  showNavBar() {
    if (this.router.url === '/login') {
      return false;
    } else {
      return true;
    }
  }
}
