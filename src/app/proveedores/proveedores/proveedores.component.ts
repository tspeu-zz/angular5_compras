import { Component, OnInit } from '@angular/core';

import { ProveedoresService } from '../../servicios/proveedores.service';
import { LoadindComponent} from '../../utilidates/loadind/loadind.component';


const _URL_DB = 'https://smart-home-78b50.firebaseio.com/';
const _PRESUPUESTO = 'presupuestos.json';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

proveedores = [];
muestra = true;
eliminado = false;
skeletons = true;


  constructor( private _proService: ProveedoresService) {
    this.getAllProvedores();
  }

  ngOnInit() {
    // this.proveedores = this._proService.getProvedoores();

  }

  getAllProvedores() {
    this._proService.getConfig().subscribe( res => {
      console.log('res-->', res);
        // tslint:disable-next-line:forin
        for ( const id$ in res) {
          const p = res[id$];
          p.id$ = id$;
          this.proveedores.push(res[id$]);
        }
        this.skeletons = false;
        this.muestra = false;
      console.log('this.skeletos', this.skeletons);
      console.log('this.presu', this.proveedores);
  });
  }

}
