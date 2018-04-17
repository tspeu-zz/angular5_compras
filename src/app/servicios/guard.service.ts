import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginEmailService } from './login-email.service';

@Injectable()
export class GuardService implements CanActivate {

  constructor(private loginService: LoginEmailService) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.loginService.isAuthentificated();
  }

}
