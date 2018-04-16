import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/RX';
// import { forEach } from '@firebase/util';

const _URL_DB = 'https://smart-home-78b50.firebaseio.com/';
const _PRESUPUESTO = 'presupuestos.json';
const _URL_UPDATE = 'presupuestos';
// https://smart-home-78b50.firebaseio.com/presupuestos/-L9ynEmCK6ooY5-b9cXn

const configUrl = _URL_DB + _PRESUPUESTO;
const configUrlUPDATE = _URL_DB +  _URL_UPDATE;


@Injectable()
export class PresupuestosService {

  presupuestos = [];


  constructor(private http: Http, private httpClient: HttpClient) { }

  item: Array<any> = [];

  postPresupuesto(presupuesto) {
    const newPresupuesto = JSON.stringify(presupuesto);
    const headers = new Headers({
        'Content-type': 'aplication/json'
      });

    return this.http.post(_URL_DB + _PRESUPUESTO, newPresupuesto, {headers})
    .map((res) => {
      console.log('res->', res.json());
      return res.json();
    });
  }

  getPresupuestos() {
    return this.http.get(_URL_DB + _PRESUPUESTO)
    .map( (res) => {
      console.log('res-->', res);
      return res = res.json();
    } );
  }

  // httpClient
  getConfig() {
    return this.httpClient.get(configUrl);
  }

  getUpdate(id$: string) {
    const url = `${configUrlUPDATE}/${id$}.json`;
    console.log('configUrlUPDATE', configUrlUPDATE);
    return this.httpClient.get(url);
  }

  putPresupuesto(p: any, id$: string) {
    const newPre = JSON.stringify(p);
    const headers = new Headers({
      'Content-type': 'aplication/json'
    });

    const url = `${configUrlUPDATE}/${id$}.json`;

    return this.http.put(url, newPre, {headers})
          .map( res => {
            console.log('akiiiiiiii- yupdatye',  res.json());
            return res.json();
          });
  }

  delPresupuesto(id$: string) {
    const url = `${configUrlUPDATE}/${id$}.json`;
    return this.http.delete(url)
    .map( res => {
      console.log('akiiiiiiii- delete',  res.json());
      return res.json();
    });
  }

}





/*
(method) Observable<Response>.
forEach(next: (value: Response) => void, PromiseCtor?: PromiseConstructor): Promise<void>
@method — forEach
@param next — a handler for each value emitted by the observable
@param PromiseCtor — a constructor function used to instantiate the Promise
@return
a promise that either resolves on observable completion or rejects with the handled error
    // * http.get('people.json').subscribe((res:Response) => this.people = res.json());
    // .subscribe((res: Response) => {
    //   this.item = res.json();
    //   console.log('this.item', this.item);
    // }) ;
    // .forEach(res => {
    //     console.log('service presupuesto-->', res);
    // })

  // ;
"{" - L9ynEmCK6ooY5 - b9cXn ":
  {"
      base ":44,"
      concepto ":"
      444444 ","
      fecha ":"
      2018 - 04 - 13 ","
      iva ":4.4,"
      proveedor ":"
      444444 ","
      tipo ":"
      0.10 ","
      total ":48.4
    },"
- L9ynZUehcGwMYgibldC ":{"
base ":85,"
concepto ":"
444444 ","
fecha ":"
2018 - 04 - 13 ","
iva ":3.4,"
proveedor ":"
Alguien444 ","
tipo ":"
0.04 ","
total ":88.4}," - L9yoxkzlj - blcWOh - eb ":{"
base ":502,"
concepto ":"
Cosas ","
fecha ":"
2018 - 04 - 13 ","
iva ":50.2,"
proveedor ":"
Empresa SA ","
tipo ":"
0.10 ","
total ":552.2}}"


*/
