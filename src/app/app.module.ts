import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ShoppingEditComponent } from './components/shopping-list/shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './components/auth/auth.component';
import { AuthInterceptor } from './interceptors/auth-interceptor.service';
import { RecipesModule } from './modules/recipes.module';
import { SharedModule } from './modules/shared.module';
import { ShoppingListModule } from './modules/shopping-list.module';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    SharedModule,
    RecipesModule,
    ShoppingListModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
