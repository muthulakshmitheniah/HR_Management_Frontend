import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

export interface Admin {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  adminUsername: string = environment.adminUsername;
  adminPassword: string = environment.adminPassword;

  constructor(private http: HttpClient, private router: Router) { }

  adminLogin(username: string, password: string): void {
    if (username === this.adminUsername && password === this.adminPassword) {
      alert("Login Successful");
      console.log("Login successful");

      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem("token", (Math.random() + 1).toString(36).substring(7));
      }

      this.router.navigate(['/admin/admin-dashboard']);
    } else {
      alert("Login failed..Wrong Credentials");
      console.log("Login failed");
      this.router.navigate(['/admin/login']);
    }
  }

  isAdminLoggedIn(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem("token") !== null;
    }
    return false;
  }
}
