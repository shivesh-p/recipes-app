import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent {
  id: number = 0;
  allowEdit: boolean = false;
  constructor(private recipeService: RecipesService, private route: ActivatedRoute,
    private router: Router) { }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.route.params.subscribe((params: Params) => {
      this.allowEdit = params['id']
      if (this.allowEdit) {
        this.id = +params['id'];
      }
    })
  }
}
