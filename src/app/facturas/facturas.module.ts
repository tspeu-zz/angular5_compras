import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes } from '@angular/router';
// import { HttpModule } from '@angular/http';
// import { HttpClientModule } from '@angular/common/http';
// import { EurosPipe } from '../pipes/euros.pipes.pipe';

import { AddFacturaComponent } from './facturas/add-factura/add-factura.component';
import { FacturasComponent } from './facturas/facturas.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule, ReactiveFormsModule,

  ],
  declarations: [AddFacturaComponent, FacturasComponent],
  providers : []
})
export class FacturasModule { }
