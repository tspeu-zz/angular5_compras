import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class LoginEmailService {

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }


  regUser(userdata) {
    firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(userdata.email, userdata.password)
    .catch(err => { console.log('err', err); } );
  }

  inicioSession(userdate) {
    firebase.auth().signInWithEmailAndPassword(userdate.email, userdate.password)
    .then(res => {
      console.log('res', res);
      this.router.navigate(['/inicio']);
    }).catch(err => console.log('error session', err));
  }

  isAuthentificated() {
    const user = firebase.auth().currentUser;
    if (user) {
      return true;
    } else {
      return false;
    }
  }
  logOut() {
    firebase.auth().signOut();
  }


}
