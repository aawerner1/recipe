import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch:'full' },
  { path: "recipes", loadChildren: () => import("./modules/recipes.module").then(m => m.RecipesModule) },
  { path: "shopping-list", loadChildren: () => import("./modules/shopping-list.module").then( m => m.ShoppingListModule ) },
  { path: 'auth', component: AuthComponent }, 
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/recipes' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
