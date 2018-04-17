import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { LoginEmailService } from '../../servicios/login-email.service';
import {Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  userData: any;

  errForm = {
    'email': '',
    'password': ''
  };

  msmValidacion = {
    'email': {
      'required': 'Email required',
      'email':    'Introduzca un email válido! '
    },
    'password': {
      'required': ' Password required ',
      'pattern':  ' Al menos un numero y una letra! ',
      'minLength': 'minimo 6 caracteres'
    }
  };


  constructor(private formBuilder: FormBuilder,
              private loginService: LoginEmailService,
              private router: Router, private activatedRoute: ActivatedRoute) {
  }


  ngOnInit() {

    this.formLogin = this.formBuilder.group({
      'email' : ['', [Validators.required, Validators.email]],
      'password' : ['', [ Validators.required,
                          Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
                          Validators.minLength(6)
                        ]
                    ]
    });
// add un observer a los cambios dentro del formulario y aplicar los errores
    this.formLogin.valueChanges.subscribe(
      data => this.onValueChanged(data));
// reset los datos
    this.onValueChanged();
  }

  onSubmit() {
    this.userData =  this.saveUserData();
    this.loginService.regUser(this.userData);
    this.router.navigate(['/inicio']);
  }

  saveUserData() {
    const saveUserData = {
      'email':    this.formLogin.value.email,
      'password': this.formLogin.value.password
    };
    return saveUserData;
  }

  // para añadir mensajes de errores al form
  onValueChanged(data?: any) {
    if (!this.formLogin) { return; }
    const form = this.formLogin;
    // tslint:disable-next-line:forin
    for (const field in this.errForm) {

      this.errForm[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.msmValidacion[field];
        // tslint:disable-next-line:forin
        for (const key in control.errors) {
          this.errForm[field] += messages[key] + ' ';
        }
      }
    }
  }

}
