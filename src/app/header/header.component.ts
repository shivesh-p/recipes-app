import { Component } from '@angular/core';
import { RecipeStorageService } from '../shared/recipe-storage.service';
import { RecipesService } from './../recipes/recipes.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private recipeStorage: RecipeStorageService, private recipeService: RecipesService) { }
  getAllRecipes() {
    this.recipeStorage.getRecipes().subscribe(t => {
      this.recipeService.setRecipes(t);
    })
  }
  saveAllRecipes() {
    this.recipeStorage.addAllRecipe().subscribe((v) => {
    });
  }
}
