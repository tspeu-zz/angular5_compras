import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Proveedor } from '../../modelos/proveedor.model';
import { ProveedoresService } from '../../servicios/proveedores.service';

@Component({
  selector: 'app-addprovee',
  templateUrl: './addprovee.component.html',
  styleUrls: ['./addprovee.component.css']
})
export class AddproveeComponent implements OnInit {

  // @ViewChild('formpro') formulario: NgForm;

  proveedor: Proveedor = new Proveedor();
  provincias = [];
  constructor(private proService: ProveedoresService) { }

  ngOnInit() {
    this.provincias = this.proService.getProvincias();
  }

  onSubmit(formulario) {
    this.proveedor.nombre = formulario.value.nombre;
    this.proveedor.cif = formulario.value.cif;
    this.proveedor.contacto = formulario.value.contacto;
    this.proveedor.cp = formulario.value.cp;
    this.proveedor.direccion = formulario.value.direccion;
    this.proveedor.email = formulario.value.email;
    this.proveedor.localidad = formulario.value.localidad;
    this.proveedor.provincia = formulario.value.provincia;
    this.proveedor.telefono = formulario.value.telefono;
    console.log(formulario);

    this.proService.postProveedor(this.proveedor)
    .subscribe( newPro => {});

    formulario.reset();
  }

}
