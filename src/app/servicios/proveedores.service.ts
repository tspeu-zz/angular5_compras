import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/RX';

const _URL_DB = 'https://smart-home-78b50.firebaseio.com/';
const _PROVEEDORES = 'proveedores.json';
const _URL_UPDATE_PROV = 'proveedores';
// https://smart-home-78b50.firebaseio.com/presupuestos/-L9ynEmCK6ooY5-b9cXn

const configUrl = _URL_DB + _PROVEEDORES;
const configUrlUPDATE = _URL_DB +  _URL_UPDATE_PROV;

@Injectable()
export class ProveedoresService {

  proveedores: any = [];

provincias: string[] = ['Álava', 'Albacete', 'Alicante', 'Almería', 'Asturias', 'Ávila', 'Badajoz',
  'Barcelona', 'Burgos', 'Cáceres', 'Cádiz', 'Cantabria', 'Castellón', 'Ciudad Real', 'Córdoba',
  'La Coruña', 'Cuenca', 'Gerona', 'Granada', 'Guadalajara', 'Guipúzcoa', 'Huelva', 'Huesca',
  'IslasBaleares', 'Jaén', 'León', 'Lérida', 'Lugo', 'Madrid', 'Málaga', 'Murcia', 'Navarra', 'Orense',
  'Palencia', 'Las Palmas', 'Pontevedra', 'La Rioja', 'Salamanca', 'Segovia', 'Sevilla', 'Soria',
  'Tarragona', 'Santa Cruz de Tenerife', 'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya',
  'Zamora', 'Zaragoza'
];

  constructor(private http: Http, private httpClient: HttpClient) { }


  postProveedor(proveedor) {
    const newProveedor = JSON.stringify(proveedor);
    const headers = new Headers({
        'Content-type': 'aplication/json'
      });

    return this.http.post(_URL_DB + _PROVEEDORES, newProveedor, {headers})
    .map((res) => {
      console.log('res->', res.json());
      return res.json();
    });
  }

  getProvedoores() {
    return this.http.get(_URL_DB + _PROVEEDORES)
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

  putProveedor(p: any, id$: string) {
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

  delProveedor(id$: string) {
    const url = `${configUrlUPDATE}/${id$}.json`;
    return this.http.delete(url)
    .map( res => {
      console.log('akiiiiiiii- delete',  res.json());
      return res.json();
    });
  }

  // BUSCAR termino quiery es asi
  getProvedoresSearch(buscar: string) {
      const url = `${configUrl}?orderBy="nombre"&startAt="${ buscar }"&endAt="${buscar}\uf8ff"`;
      // return this.httpClient.get(url);
      return this.http.get(url)
      .map( (res) => {
        console.log('res-->', res);
        return res = res.json();
      });
  }


  getProvincias() {
    return this.provincias;
  }


}
