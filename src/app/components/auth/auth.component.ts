import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error!: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    this.isLoading = true;
    
    const email = form.value.email;
    const password = form.value.password 
    const postData = this.isLoginMode ? 
      this.authService.signIn(email, password) : 
      this.authService.signUp(email, password)

    postData.pipe(take(1))
    .subscribe({
      next: (result) => {this.isLoading = false; this.router.navigate(['/recipes'])},
      error: (errorMessage) => {this.isLoading = false; this.error = errorMessage},
    })

    form.reset()    
  }

}