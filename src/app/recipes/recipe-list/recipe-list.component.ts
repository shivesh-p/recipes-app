import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as appState from '../../store/app.reducer';
import { Recipe } from '../recipe.model';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<appState.AppState>
  ) {}

  ngOnInit() {
    // this.recipeService.recipesChanged.subscribe((recipes: Recipe[]) => {
    //   this.recipes = recipes;
    // });
    // this.recipes = this.recipeService.geRecipes();
    this.store.select('recipes').subscribe((recipesState) => {
      this.recipes = recipesState.recipes;
    });
  }
  goToNewRecipe() {
    this.router.navigate(['create'], { relativeTo: this.route });
  }
}
