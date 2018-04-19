import { Component, OnInit, Input } from '@angular/core';
import { Archivo } from '../../uploads/file.modal';
import { LoadfileService } from '../../servicios/load.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {

  @Input() upload: Archivo;

  constructor(private loadFileService: LoadfileService) { }

  ngOnInit() {
  }

  deleteContrato(upload) {
    this.loadFileService.deleteUpload(this.upload);
  }

}
