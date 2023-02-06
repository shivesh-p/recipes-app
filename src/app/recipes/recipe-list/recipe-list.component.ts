import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe(
      'R1',
      'Re Dsec',
      'https://www.shutterstock.com/image-photo/notepad-your-recipe-herbs-spices-260nw-370298699.jpg'
    ),
    new Recipe(
      'R11',
      'Re1 Dsec',
      'https://www.shutterstock.com/image-photo/notepad-your-recipe-herbs-spices-260nw-370298699.jpg'
    ),
  ];
  constructor() {}

  ngOnInit() {}
}
