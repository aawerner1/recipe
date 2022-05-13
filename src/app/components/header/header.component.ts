import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DataStorageService } from './../../services/data-storage.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  subscription!: Subscription
  constructor(
    private dataStorageService: DataStorageService, private authService: AuthService) { }


  ngOnInit() {
    this.subscription = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    })
  }

  logout() {
    this.authService.logout();
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
