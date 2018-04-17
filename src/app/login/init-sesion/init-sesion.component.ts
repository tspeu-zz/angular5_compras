import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { LoginEmailService } from '../../servicios/login-email.service';
import {Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-init-sesion',
  templateUrl: './init-sesion.component.html',
  styleUrls: ['./init-sesion.component.css']
})
export class InitSesionComponent implements OnInit {

  formSession: FormGroup;
  userData: any;

  msm = false;


  constructor(private formBuider: FormBuilder,
              private loginService: LoginEmailService,
              private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.formSession = this.formBuider.group({
      'email' : ['', [Validators.required, Validators.email]],
      'password' : ['', [ Validators.required,
                          Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
                          Validators.minLength(6)
                        ]
                    ]
    });
  }

  onSubmit() {
    this.userData =  this.saveUserData();
    this.loginService.inicioSession(this.userData);
    setTimeout(() => {
                if (this.isAuth() === false) {
                  this.msm = true;
                  }
              }, 2000);
  }

  saveUserData() {
    const saveUserData = {
      'email':    this.formSession.value.email,
      'password': this.formSession.value.password
    };
    return saveUserData;
  }

  isAuth() {
    return this.loginService.isAuthentificated();
  }

}
