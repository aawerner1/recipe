import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';
import { RecipeService } from './recipe.service';
import { Recipe } from '../models/recipe.model';
import { map, tap, take, exhaustMap } from 'rxjs';


@Injectable({
	providedIn: 'root'
})
export class DataStorageService {


	constructor(private recipeService: RecipeService, 
                private authService: AuthService, 
				private http: HttpClient) {

	}

    storeRecipes() {
        const recipes = this.recipeService.getRecipes()
        this.http.put(`${environment.api_url}/recipes.json`, recipes)
            .subscribe(response => {
                console.log(response);
                
            })
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>(`${environment.api_url}/recipes.json`).pipe(

             map((recipes: Recipe[]) => {
                 return recipes.map((recipe: Recipe) => {
                     return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
                 })
             }),
             tap(recipes =>  this.recipeService.setRecipes(recipes)) 
        )
            
    }

	
}
