import { Component, OnInit } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { PresupuestosService } from '../../servicios/presupuestos.service';
// import 'rx

const _URL_DB = 'https://smart-home-78b50.firebaseio.com/';
const _PRESUPUESTO = 'presupuestos.json';

@Component({
  selector: 'app-presupuestos',
  templateUrl: './presupuestos.component.html',
  styleUrls: ['./presupuestos.component.css']
})
export class PresupuestosComponent implements OnInit {

  presupuestos: any = [];
  muestra = true;
  eliminado = false;
  skeletons = true;

  skeletonData = [
    {proveedor: '', fecha: '', concepto: '', base: '', tipo: '', iva: '', total: '' },
    {proveedor: '', fecha: '', concepto: '', base: '', tipo: '', iva: '', total: '' },
    {proveedor: '', fecha: '', concepto: '', base: '', tipo: '', iva: '', total: '' },
    {proveedor: '', fecha: '', concepto: '', base: '', tipo: '', iva: '', total: '' }
  ];

  constructor( private presService: PresupuestosService, private http: Http) { }

  ngOnInit() {

    // this.muestra = true;
    // this.skeletons = true;
    console.log('this.skeletos', this.skeletons);

    this.presService.getConfig().subscribe( res => {
        console.log('res-->', res);
          // tslint:disable-next-line:forin
          for ( const id$ in res) {
            const p = res[id$];
            p.id$ = id$;
            this.presupuestos.push(res[id$]);
            this.muestra = false;
        }
        this.skeletons = false;
        console.log('this.skeletos', this.skeletons);
        console.log('this.presu', this.presupuestos);
    });
  }

  eliminarPresupuesto(id$: string) {
    this.presService.delPresupuesto(id$)
    .subscribe( res => {
      console.log('res borrado-->', res);
      this.presupuestos = [];
      this.getAllData();
      this.eliminado = true;
    });

  }

  getAllData() {
    this.presService.getConfig().subscribe( res => {
      console.log('res-->', res);
        // tslint:disable-next-line:forin
        for ( const id$ in res) {
          const p = res[id$];
          p.id$ = id$;
          this.presupuestos.push(res[id$]);
          this.muestra = false;
      }
      this.skeletons = false;
      console.log('this.skeletos', this.skeletons);
      console.log('this.presu', this.presupuestos);
  });
  }

}


    // this.presService.getPresupuestos().subscribe((res) => {
    // this.presupuestos = res;
    // console.log('this.presu', this.presupuestos);
    // }) ;
    // console.log('this. presupuestos', this.presupuestos);
    // .subscribe( res => {
    //   console.log('res subsbuirbe-->', res);
    //   this.presupuestos = res;
    //   console.log('presupuests-->', this.presupuestos);
    // });
    // .then(res => {
    //     this.presupuestos = res;
    //     console.log('presupuests-->', this.presupuestos);
    // });
