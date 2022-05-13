import { RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";

import { RecipeDetailComponent } from "../components/recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "../components/recipes/recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "../components/recipes/recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "../components/recipes/recipe-list/recipe-list.component";
import { RecipesComponent } from "../components/recipes/recipes.component";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared.module';
import { RecipeResolverService } from '../resolvers/reciper-resolver.service';
import { AuthGuard } from '../guards/auth-guard.service';

@NgModule({
    declarations: [
        RecipesComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeListComponent,
        RecipeEditComponent,
        
    ],
    imports: [
        RouterModule.forChild([
            {   path: '', component: RecipesComponent,
                canActivate: [AuthGuard],
                children: [
                { path: 'new', component: RecipeEditComponent },
                { path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolverService] },
                { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolverService] },
                ]
            }
        ]),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,     
        SharedModule,
    ]
  })
  export class RecipesModule { }