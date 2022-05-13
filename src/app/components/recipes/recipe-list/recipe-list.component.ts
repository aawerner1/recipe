import { DataStorageService } from './../../../services/data-storage.service';
import { Subscription } from 'rxjs';
import { RecipeService } from './../../../services/recipe.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[] = [] 
  subscription!: Subscription;

  constructor(private recipeService: RecipeService, private dataStorageService: DataStorageService) { }

  ngOnInit() {

    this.dataStorageService.fetchRecipes()

    this.recipes = this.recipeService.getRecipes();
    this.subscription = this.recipeService.recipesChanged
      .subscribe((recipes: Recipe[]) => this.recipes = recipes)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
