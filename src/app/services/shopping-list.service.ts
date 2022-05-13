import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

	startedEditing = new Subject<number>()
	private _ingredients: Ingredient[] = [
		new Ingredient('Apples', 2),
		new Ingredient('Tomatoes', 2)
	]

	ingredientsChanged = new Subject<Ingredient[]>();
	constructor() { }

	getIngredients() : Ingredient[] {
		return this._ingredients;
	}

	getIngredient(index: number) : Ingredient {
		return this._ingredients[index];
	}

	addIngredient(ingredient: Ingredient) {
		this._ingredients.push(ingredient);
		this.ingredientsChanged.next(this._ingredients.slice())
	} 

	addIngredients(ingredients: Ingredient[]) {
		this._ingredients.push(...ingredients);
		this.ingredientsChanged.next(this._ingredients.slice())
	}

	updateIngredient(index: number, newIngredient: Ingredient) {
		this._ingredients[index] = newIngredient;
		this.ingredientsChanged.next(this._ingredients.slice())
	}

	deleteIngredient(index: number) {
		this._ingredients.splice(index, 1);
		this.ingredientsChanged.next(this._ingredients.slice())
	}

	
}
