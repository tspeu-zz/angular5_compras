import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { PresupuestosService } from '../../servicios/presupuestos.service';
import { PresupuestoModel } from '../../modelos/presupuesto.model';

@Component({
  selector: 'app-addpres',
  templateUrl: './addpres.component.html',
  styleUrls: ['./addpres.component.css']
})
export class AddpresComponent implements OnInit {

  presupuestoForm: FormGroup;
  presupuesto: any;
  base = 0;
  tipo = 0;
  iva = 0;
  total = 0;

  modeloPresupuesto = new PresupuestoModel();


  constructor(private presFormBuilder: FormBuilder, private presService: PresupuestosService) { }

  ngOnInit() {


    this.presupuestoForm = this.presFormBuilder.group({
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

    this.presService.postPresupuesto(this.presupuesto)
    .subscribe( (newPres) => {
      console.log('new PRES--> ENVIADO', this.presupuesto);
    });

    this.presupuestoForm.reset();

  }

// modelo
  savePresupuesto() {
    this.modeloPresupuesto = {
      proveedor:  this.presupuestoForm.value.proveedor,
      fecha:      this.presupuestoForm.value.fecha,
      concepto:   this.presupuestoForm.value.concepto,
      base:       this.presupuestoForm.value.base,
      tipo:       this.presupuestoForm.value.tipo,
      iva:        this.presupuestoForm.value.iva,
      total:      this.presupuestoForm.value.total
    };
    return this.modeloPresupuesto;
  }

  // cambiois
  onCambios() {
    this.presupuestoForm.valueChanges.subscribe( (valor) => {
      this.base = valor.base;
      this.tipo = valor.tipo;
      this.presupuestoForm.value.iva = this.base * this.tipo;
      this.presupuestoForm.value.total = this.base + (this.base * this.tipo);
    });
  }

}

