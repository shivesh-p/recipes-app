import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs';
import * as shoppingActions from '../../shopping-list/store/shopping-list.action';
import * as appState from '../../store/app.reducer';
import { Recipe } from '../recipe.model';
@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css'],
})
export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe;
  id: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<appState.AppState>
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        map((params: Params) => {
          return +params['id'];
        }),
        switchMap((id) => {
          this.id = id;
          return this.store.select('recipes');
        }),
        map((recipeState) => {
          return recipeState.recipes.filter((recipe, index) => {
            return recipe.id === this.id;
          })[0];
        })
      )
      .subscribe((recipe) => {
        this.recipe = recipe;
      });
  }
  addIngredients() {
    //this.recipeService.onAddToShoppingList(this.recipe.ingredients);
    this.store.dispatch(
      new shoppingActions.AddIngredients(this.recipe.ingredients)
    );
  }
  deleteRecipeById() {
    //this.recipeService.deleteRecipeById(this.recipe.id);
    this.navigateAway();
  }
  navigateAway() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
