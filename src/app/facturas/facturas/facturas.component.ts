import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {

  facturas = [
    {proveedor: 'ACME', fecha: '2018-06-05', concepto: 'Prueba', base: '500', tipo: '50', iva: '10', total: '550' },
    {proveedor: 'TOYS', fecha: '01/01/2018', concepto: 'VARIOS', base: '', tipo: '', iva: '', total: '' },
    {proveedor: 'ATOS', fecha: '01/01/2018', concepto: 'VARIOS', base: '', tipo: '', iva: '', total: '' },
    {proveedor: 'LEGO', fecha: '01/01/2018', concepto: 'VARIOS', base: '', tipo: '', iva: '', total: '' }
  ];
  skeletonData = [
    {proveedor: '', fecha: '', concepto: '', base: '', tipo: '', iva: '', total: '' },
    {proveedor: '', fecha: '', concepto: '', base: '', tipo: '', iva: '', total: '' },
    {proveedor: '', fecha: '', concepto: '', base: '', tipo: '', iva: '', total: '' },
    {proveedor: '', fecha: '', concepto: '', base: '', tipo: '', iva: '', total: '' }
  ];

  muestra = true;
  eliminado = false;
  skeletons = true;

  constructor() { }

  ngOnInit() {
    this.skeletons = false;
  }

  eliminarPresupuesto(id) {

  }

}
