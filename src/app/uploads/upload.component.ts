import { Component, OnInit } from '@angular/core';
import { LoadfileService } from '../servicios/load.service';
import * as _ from 'lodash';
import { Archivo } from './file.modal';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  selectFiles: FileList;
  currentUpload: Archivo;

  loading = false;

  constructor(private loadFileService: LoadfileService) { }

  ngOnInit() {
  }

  cargarFile (evt) {
    this.selectFiles = evt.target.files;
  }

  uploadSingle () {
    const file = this.selectFiles.item(0);
    this.currentUpload = new Archivo(file);
    this.loading = true;
    this.loadFileService.pushUpload(this.currentUpload);

  }
}
