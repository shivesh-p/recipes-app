import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, map } from 'rxjs';
import * as appState from '../../store/app.reducer';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import * as recipeActions from '../store/actions';
@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent {
  id: number = 0;
  allowEdit: boolean = false;
  recipeForm: FormGroup;
  subscription: Subscription;
  constructor(
    private recipeService: RecipesService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<appState.AppState>
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    debugger;
    this.route.params.subscribe((params: Params) => {
      this.allowEdit = params['id'];
      if (typeof params['id'] == 'undefined') {
        this.allowEdit = false;
      }
      this.id = +params['id'];
      this.initializeForm();
    });
  }

  private initializeForm() {
    let rName = '';
    let rDesc = '';
    let rImgPath = '';
    let rIngredients = new FormArray([]);
    if (this.allowEdit) {
      //let recipe: Recipe = this.recipeService.getRecipeById(this.id);
      this.subscription = this.store
        .select('recipes')
        .pipe(
          map((recipeState) => {
            return recipeState.recipes.filter((recipes) => {
              return recipes.id === this.id;
            })[0];
          })
        )
        .subscribe((recipe: Recipe) => {
          rName = recipe.name;
          rDesc = recipe.desc;
          rImgPath = recipe.imagePath;
          if (recipe['ingredients']) {
            for (let item of recipe.ingredients) {
              rIngredients.push(
                new FormGroup({
                  name: new FormControl(item.name),
                  amount: new FormControl(item.amount),
                })
              );
            }
          }
        });
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(rName, [Validators.required]),
      desc: new FormControl(rDesc, [Validators.required]),
      imagePath: new FormControl(rImgPath, [Validators.required]),
      ingredients: rIngredients,
    });
  }

  submitForm() {
    debugger;
    if (this.allowEdit) {
      //this.recipeService.updateRecipe(this.id, this.recipeForm.value);
      this.store.dispatch(
        new recipeActions.EditRecipe({
          id: this.id,
          recipe: this.recipeForm.value,
        })
      );
    } else {
      //this.recipeService.addRecipe(this.recipeForm.value);
      this.store.dispatch(
        new recipeActions.CreateRecipe(this.recipeForm.value)
      );
    }
    this.navigateAway();
    console.log(this.recipeForm.value);
  }

  get controls() {
    // a getter!

    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  addIngredientControl() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(0, [
          Validators.required,
          Validators.pattern(/^-?(0|[1-9]\d*)?$/),
        ]),
      })
    );
  }

  removeIngredientControl(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
  deleteRecipeById() {
    //this.recipeService.deleteRecipeById(this.id);
    this.store.dispatch(new recipeActions.DeleteRecipe(this.id));
    //this.navigateAway();
  }
  navigateAway() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.subscription) this.subscription.unsubscribe();
  }
}
