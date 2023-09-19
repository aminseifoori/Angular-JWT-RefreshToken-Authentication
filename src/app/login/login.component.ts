import { Component } from '@angular/core';
import { LoginModel } from '../shared/interface/login-model';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AuthenticatedResponse } from '../shared/interface/authenticated-response';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  invalidLogin: boolean;
  credentials: LoginModel = {username:'', password:''};

  constructor(private router: Router, private http: HttpClient){

  }

  login = ( form: NgForm) => {
    if (form.valid) {
      this.http.post<AuthenticatedResponse>("https://localhost:5001/api/users/login", this.credentials, {
        headers: new HttpHeaders({ "Content-Type": "application/json"})
      })
      .subscribe({
        next: (response: AuthenticatedResponse) => {
          const token = response.accessToken;
          const refreshToken = response.refreshToken;
          localStorage.setItem("jwt", token); 
          localStorage.setItem("refreshToken", refreshToken);
          this.invalidLogin = false; 
          this.router.navigate(["/"]);
        },
        error: (err: HttpErrorResponse) => this.invalidLogin = true
      });
    }
  }

  goHome = () => {
    this.router.navigate(["/"]);
  }

}
