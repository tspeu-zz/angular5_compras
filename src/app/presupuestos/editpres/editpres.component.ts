import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { PresupuestosService } from '../../servicios/presupuestos.service';
import { PresupuestoModel } from '../../modelos/presupuesto.model';
import {Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-editpres',
  templateUrl: './editpres.component.html',
  styleUrls: ['./editpres.component.css']
})

export class EditpresComponent implements OnInit {

formEdit: FormGroup;
presupuesto: any;
base = 0;
tipo = 0;
iva = 0;
total = 0;
id: string;

modeloPresupuesto = new PresupuestoModel();

  constructor(private presFormBuilder: FormBuilder, private presService: PresupuestosService,
              private route: Router, private activateRouter: ActivatedRoute) {
      this.activateRouter.params.subscribe(params => {
          this.id = params['id'];
          console.log('this.id', this.id);
          this.presService.getUpdate(this.id)
          .subscribe( data => {
            this.presupuesto = data;
            console.log('desde UPDATE->prespuesto', this.presupuesto);
            });
      });
  }

  ngOnInit() {
    this.formEdit = this.presFormBuilder.group({
      proveedor: ['', [Validators.required, Validators.minLength(5)]],
      fecha: ['', Validators.required],
      concepto: ['', [Validators.required, Validators.minLength(5)]],
      base: ['', {  validators: Validators.required}],
      tipo: ['', {  validators: Validators.required}],
      iva: [this.iva , {validators: Validators.required,
                        updateOn: 'change'
                        }],
      total: [this.total, { validators: Validators.required,
                            updateOn: 'change'
                          }]
    });

    this.onCambios();
  }


  onSubmit() {

    this.presupuesto = this.savePresupuesto();

    this.presService.putPresupuesto(this.presupuesto, this.id)
    .subscribe( data => {
      console.log('new PRES--> ENVIADO', this.presupuesto);
      this.route.navigate(['/presupuestos']);
    })
    ;

    this.formEdit.reset();

  }

  // modelo
  savePresupuesto() {
    this.modeloPresupuesto = {
      proveedor:  this.formEdit.value.proveedor,
      fecha:      this.formEdit.value.fecha,
      concepto:   this.formEdit.value.concepto,
      base:       this.formEdit.value.base,
      tipo:       this.formEdit.value.tipo,
      iva:        this.formEdit.value.iva,
      total:      this.formEdit.value.total
    };
    console.log('presuModel', this.modeloPresupuesto );
    return this.modeloPresupuesto;
  }


    // cambiois
  onCambios() {
    this.formEdit.valueChanges.subscribe( (valor) => {
      this.base = valor.base;
      this.tipo = valor.tipo;
      this.formEdit.value.iva = this.base * this.tipo;
      this.formEdit.value.total = this.base + (this.base * this.tipo);
    });
  }

}
