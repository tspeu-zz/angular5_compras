import { Component, OnInit } from '@angular/core';
import { LoginEmailService } from '../servicios/login-email.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private loginService: LoginEmailService,
              private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  isAuth() {
    return this.loginService.isAuthentificated();
  }

  onLogOut() {
    this.loginService.logOut();
    this.router.navigate(['/inicio']);
  }

}
