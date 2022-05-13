import { ShoppingListService } from './../../../services/shopping-list.service';
import { Recipe } from 'src/app/models/recipe.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

  recipe!: Recipe;
  id!: number;
  constructor(private recipeService: RecipeService,
              private shoppingListService: ShoppingListService,
              private router: ActivatedRoute) { }

  ngOnInit() {    
    this.router.params
      .subscribe((params: Params) => {
        this.id = +params['id'];        
        this.recipe = this.recipeService.getRecipe(this.id)
      })
   }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);

  }

}
