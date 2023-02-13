import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipesService } from '../recipes.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent {
  id: number = 0;
  allowEdit: boolean = false;
  recipeForm: FormGroup;

  constructor(private recipeService: RecipesService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    debugger;
    this.route.params.subscribe((params: Params) => {
      this.allowEdit = params['id']
      if (typeof params['id'] == 'undefined') {
        this.allowEdit = false;
      }
      this.id = +params['id'];
      this.initializeForm();
    })
  }

  private initializeForm() {
    let rName = '';
    let rDesc = '';
    let rImgPath = '';
    let rIngredients = new FormArray([]);
    if (this.allowEdit) {
      let recipe: Recipe = this.recipeService.getRecipeById(this.id);
      rName = recipe.name;
      rDesc = recipe.desc;
      rImgPath = recipe.imagePath;
      if (recipe['ingredients']) {
        for (let item of recipe.ingredients) {
          rIngredients.push(
            new FormGroup({
              'name': new FormControl(item.name),
              'amount': new FormControl(item.amount)
            })
          )
        }
      }
    }
    this.recipeForm
      = new FormGroup({
        'name': new FormControl(rName, [Validators.required]),
        'desc': new FormControl(rDesc, [Validators.required]),
        'imagePath': new FormControl(rImgPath, [Validators.required]),
        'ingredients': rIngredients
      });
    console.log("form-====", this.recipeForm);
  }

  submitForm() {
    debugger;
    if (this.allowEdit) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value)
    }
    else {
      this.recipeService.addRecipe(this.recipeForm.value)

    }
    this.navigateAway()
    console.log(this.recipeForm.value);
  }

  get controls() { // a getter!

    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  addIngredientControl() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(0, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)])
      })
    )
  }

  removeIngredientControl(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
  deleteRecipeById() {
    this.recipeService.deleteRecipeById(this.id);
    this.navigateAway()
  }
  navigateAway() {
    this.router.navigate(['../'], { relativeTo: this.route })
  }
}
