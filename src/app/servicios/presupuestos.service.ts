import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/RX';

const _URL_DB = 'https://smart-home-78b50.firebaseio.com/';
const _PRESUPUESTO = 'presupuestos.json';

@Injectable()
export class PresupuestosService {


  constructor(private http: Http) { }

  postPresupuesto(presupuesto) {
    const newPresupuesto = JSON.stringify(presupuesto);
    const headers = new Headers({
        'Content-type': 'aplication/json'
      });

    return this.http.post(_URL_DB + _PRESUPUESTO, newPresupuesto, {headers})
    .map((res) => {
      console.log('res->', res.json);
      return res.json;
    });
  }

  getPresupuestos() {

  }

}
