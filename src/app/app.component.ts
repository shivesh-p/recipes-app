import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'recipes-app';
  shopping: boolean = false;
  recipes: boolean = true;

  switchNavigation(type: string) {
    if (type == 'recipes') {
      this.shopping = false;
      this.recipes = true;
    }
    else {
      this.shopping = true;
      this.recipes = false;
    }
  }
}
