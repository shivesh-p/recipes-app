import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe = new Recipe(0, '', '', '', []);
  constructor(private recipeService: RecipesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.recipe = this.recipeService.getRecipeById(+params['id']);
    })
  }
  addIngredients() {
    this.recipeService.onAddToShoppingList(this.recipe.ingredients);
  }
  deleteRecipeById() {
    this.recipeService.deleteRecipeById(this.recipe.id);
    this.navigateAway()
  }
  navigateAway() {
    this.router.navigate(['../'], { relativeTo: this.route })
  }

}
