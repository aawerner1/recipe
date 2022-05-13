import { Ingredient } from 'src/app/models/ingredient.model';
import { ShoppingListService } from './../../../services/shopping-list.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('form') shoppingListForm!: NgForm;
  subscription!: Subscription;
  editMode = false;
  editedItemIndex!: number;
  editedItem!: Ingredient;
  constructor(private shoppingListService: ShoppingListService) { }


  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing
      .subscribe(
        (index: number) => {
          this.editMode = true;
          this.editedItemIndex = index;
          this.editedItem = this.shoppingListService.getIngredient(index);
          this.shoppingListForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
        }
      )
  }

  onSubmit(form: NgForm) {
    if(this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, form.value);
    } else  this.shoppingListService.addIngredient(form.value);
    this.onClear();
  }

 

  onDelete() {
    this.onClear();
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
  }

  onClear() {
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
