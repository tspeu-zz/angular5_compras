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

// modulos
import { FacturasModule } from './facturas/facturas.module';
// componentes
import { AppComponent } from './app.component';
import { IniciComponent } from './inici/inici.component';
import { LoginComponent } from './login/login/login.component';
import { InitSesionComponent } from './login/init-sesion/init-sesion.component';
import { HeaderComponent } from './header/header.component';
import { ProveedoresComponent } from './proveedores/proveedores/proveedores.component';
import { AddproveeComponent } from './proveedores/addprovee/addprovee.component';
import { PresupuestosComponent } from './presupuestos/presupuestos/presupuestos.component';
import { AddpresComponent } from './presupuestos/addpres/addpres.component';
import { EditpresComponent } from './presupuestos/editpres/editpres.component';
import { LoadindComponent } from './utilidates/loadind/loadind.component';
import { AddFacturaComponent } from './facturas/facturas/add-factura/add-factura.component';
// directivas
import { ItemselectDirective } from './directivas/itemselect.directive';
import { EurosPipe } from './pipes/euros.pipes.pipe';
// servicios
import { ProveedoresService } from './servicios/proveedores.service';
import { PresupuestosService } from './servicios/presupuestos.service';
import { LoginEmailService } from './servicios/login-email.service';
import { GuardService } from './servicios/guard.service';

const routes: Routes = [
  {path: '', component: IniciComponent },
  {path: 'proveedores', component: ProveedoresComponent , canActivate: [GuardService] },
  {path: 'addprove', component: AddproveeComponent , canActivate: [GuardService] },
  {path: 'presupuestos', component: PresupuestosComponent, canActivate: [GuardService]  },
  {path: 'addpres', component: AddpresComponent , canActivate: [GuardService] },
  {path: 'editpres/:id', component: EditpresComponent, canActivate: [GuardService]  },
  {path: 'login', component: LoginComponent },
  {path: 'initsession', component: InitSesionComponent },
  {path: 'addfactura', component: AddFacturaComponent },
  {path: '**', component: IniciComponent , canActivate: [GuardService] }
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
    EditpresComponent,
    LoginComponent,
    InitSesionComponent
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
    HttpClientModule,
    FacturasModule
  ],
  providers: [ProveedoresService,
              PresupuestosService,
              LoginEmailService,
              GuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
