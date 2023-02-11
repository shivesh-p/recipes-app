import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  constructor(private recipeService: RecipesService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    debugger;
    this.recipes = this.recipeService.geRecipes();
  }
  goToNewRecipe() {
    this.router.navigate(['create'], { relativeTo: this.route })
  }
}
