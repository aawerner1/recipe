import { Ingredient } from 'src/app/models/ingredient.model';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  id!: number;
  editMode: boolean = false;
  recipeForm!: FormGroup;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.id = +params['id'];
        this.editMode = !!params['id'];
        this.initForm();
      })

  }

  private initForm() {
    let recipe: Recipe;
    let recipeIngredients = new FormArray([])
    if(this.editMode) {
      recipe = this.recipeService.getRecipe(this.id)
    } else {
      recipe = new Recipe('', '', '', [{}])
    }

    if(recipe.ingredients) {
        recipe.ingredients.forEach((ingredient: Ingredient) => {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          )
        });
    }
    
    this.recipeForm = new FormGroup({
      name: new FormControl(recipe.name, Validators.required),
      imagePath: new FormControl(recipe.imagePath, Validators.required),
      description: new FormControl(recipe.description, Validators.required),
      ingredients: recipeIngredients
    })
  }

  onSubmit() {
    if(this.editMode) {
        this.recipeService.updateRecipe(this.id, this.recipeForm.value)
    } else {
      this.recipeService.addRecipe(this.recipeForm.value)
    }
    
  }

  get ingredientsCtrl() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id)
    this.router.navigate(['../'])
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
  }

  onCancel() {
    this.router.navigate(['../'])
  }
}
