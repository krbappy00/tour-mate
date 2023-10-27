import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'authToken';

  constructor(private router:Router) {}


  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }


  isLoggedIn(): boolean {
    const token = this.getToken();
    return token !== null && token !== undefined;
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login'])
  }
}
 