import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
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
muestra = false;

eliminado = false;
skeletons = true;

campoBuscar: FormControl;
buscar: string;
resultados = false;
noResultados = false;


  constructor( private _proService: ProveedoresService) {
    // this.getAllProvedores();
  }

  ngOnInit() {
    // this.proveedores = this._proService.getProvedoores();
    this.campoBuscar = new FormControl();
    this.campoBuscar.valueChanges
      .subscribe(term => {
          this.buscar = term;
          this.muestra = true;
          if (this.buscar.length !== 0) {
            this._proService.getProvedoresSearch(this.buscar)
              .subscribe ( res => {
                  this.proveedores = [];
                // tslint:disable-next-line:forin
                  for (const id$ in res) {
                    const p = res[id$];
                    p.id$ = id$;
                    this.proveedores.push(res[id$]);
                  }
                  if (this.proveedores.length < 1 && this.buscar.length >= 1) {
                      this.noResultados = true;
                  } else {
                      this.noResultados = false;
                  }
            });

            this.muestra = false;
            this.resultados = true;
          } else {
            this.proveedores = [];
            this.muestra = false;
            this.resultados = false;
          }
      });

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
