import { Component, OnInit } from '@angular/core';
import { LoadfileService } from '../servicios/load.service';
import { AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Archivo } from '../uploads/file.modal';



@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.css']
})
export class ContratosComponent implements OnInit {

  uploads: Observable<any[]>;


  constructor(private loadFileService: LoadfileService) { }

  ngOnInit() {

    this.uploads = this.loadFileService.getUploads();
  }

}
