import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ShoppingListComponent } from '../components/shopping-list/shopping-list.component';
import { ShoppingEditComponent } from '../components/shopping-list/shopping-edit/shopping-edit.component';
import { SharedModule } from './shared.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: ShoppingListComponent }]),
    SharedModule,
  ],
})
export class ShoppingListModule {}