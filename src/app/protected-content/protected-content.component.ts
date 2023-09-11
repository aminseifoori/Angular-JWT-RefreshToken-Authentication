import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-protected-content',
  templateUrl: './protected-content.component.html',
  styleUrls: ['./protected-content.component.css']
})
export class ProtectedContentComponent {

  constructor(private router: Router,private jwtHelper: JwtHelperService){}

  goHome = () => {
    this.router.navigate(["/"]);
  }

  isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    return false;
  }

  logOut = () => {
    localStorage.removeItem("jwt");
    this.router.navigate(["/"]);
  }

}
