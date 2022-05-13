import { DataStorageService } from './data-storage.service';
import { HttpClient } from '@angular/common/http';
import { Ingredient } from 'src/app/models/ingredient.model';
import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { ShoppingListService } from './shopping-list.service';
import { Subject, take } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class RecipeService {

	recipesChanged = new Subject<Recipe[]>();
	private _recipes: Recipe[] = [];

	constructor(private shoppingListService: ShoppingListService) {

	}

	setRecipes(recipe: Recipe[]) {
		this._recipes = recipe;
		this.recipesChanged.next(this._recipes.slice())
	}

	getRecipes() {
		return this._recipes.slice();
	}

	getRecipe(id: number) {
		return this._recipes.slice()[id];
	}	

	addIngredientsToShoppingList(ingredients: Ingredient[]) {
		this.shoppingListService.addIngredients(ingredients);
		this.recipesChanged.next(this._recipes.slice())
	}

	addRecipe(recipe: Recipe) {
		this._recipes.push(recipe);	
		this.recipesChanged.next(this._recipes.slice())
	}

	updateRecipe(index: number, newRecipe: Recipe) {
		this._recipes[index] = newRecipe;
		this.recipesChanged.next(this._recipes.slice())
	}

	deleteRecipe(index: number) {
		this._recipes.splice(index, 1);
		this.recipesChanged.next(this._recipes.slice())
	}
}
