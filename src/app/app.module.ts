import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

// firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

// componentes
import { AppComponent } from './app.component';
import { IniciComponent } from './inici/inici.component';
import { HeaderComponent } from './header/header.component';
import { ProveedoresComponent } from './proveedores/proveedores/proveedores.component';
import { AddproveeComponent } from './proveedores/addprovee/addprovee.component';
import { PresupuestosComponent } from './presupuestos/presupuestos/presupuestos.component';
import { AddpresComponent } from './presupuestos/addpres/addpres.component';
import { EditpresComponent } from './presupuestos/editpres/editpres.component';
// directivas
import { ItemselectDirective } from './directivas/itemselect.directive';
// servicios
import { ProveedoresService } from './servicios/proveedores.service';
import { PresupuestosService } from './servicios/presupuestos.service';
import { EurosPipe } from './pipes/euros.pipes.pipe';
import { LoadindComponent } from './utilidates/loadind/loadind.component';

const routes: Routes = [
  {path: '', component: IniciComponent },
  {path: 'proveedores', component: ProveedoresComponent },
  {path: 'addprove', component: AddproveeComponent },
  {path: 'presupuestos', component: PresupuestosComponent },
  {path: 'addpres', component: AddpresComponent },
  {path: 'editpres/:id', component: EditpresComponent },
  {path: '**', component: IniciComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ProveedoresComponent,
    ItemselectDirective,
    IniciComponent,
    HeaderComponent,
    AddproveeComponent,
    AddpresComponent,
    PresupuestosComponent,
    EurosPipe,
    LoadindComponent,
    EditpresComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    HttpClientModule
  ],
  providers: [ProveedoresService, PresupuestosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
