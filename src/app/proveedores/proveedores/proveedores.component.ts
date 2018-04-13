import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from '../../servicios/proveedores.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

proveedores = [];


  constructor( private _proService: ProveedoresService) { }

  ngOnInit() {
    this.proveedores = this._proService.getProvedoores();
  }

}
