import { Ingredient } from "../shared/ingredient.model";

export class Recipe {
  public id: number;
  public name: string;
  public desc: string;
  public imagePath: string;
  public ingredients: Ingredient[];
  constructor(id: number, name: string, desc: string, imagePath: string, ingredients: Ingredient[]) {
    this.name = name;
    this.desc = desc;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
    this.id = id;
  }
}
