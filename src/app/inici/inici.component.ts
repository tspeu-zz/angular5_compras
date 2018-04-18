import { Component, OnInit } from '@angular/core';
import { LoginEmailService } from '../servicios/login-email.service';

@Component({
  selector: 'app-inici',
  templateUrl: './inici.component.html',
  styleUrls: ['./inici.component.css']
})
export class IniciComponent implements OnInit {

  constructor(private autService: LoginEmailService) { }

  ngOnInit() {
  }

  isAuth() {
    return this.autService.isAuthentificated();
  }

}
