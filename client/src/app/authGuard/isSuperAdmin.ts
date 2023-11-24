import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class IsSuperAdmin implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  canActivate(): boolean {
    if (
      this.userService.getUser()?.isSuperAdmin == true &&
      this.authService.isLoggedIn()
    ) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
