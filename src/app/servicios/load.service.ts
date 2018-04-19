import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { Archivo } from '../uploads/file.modal';

@Injectable()
export class LoadfileService {

// raiz en la db dsonde se guardan los archivos
private basePath = '/uploads';

uploadsRef: AngularFireList<Archivo>;

uploads: Observable<any[]>;

constructor(private angularFireDatabase: AngularFireDatabase ) { }


  getUploads() {
    this.uploadsRef = this.angularFireDatabase.list(this.basePath);
    this.uploads = this.uploadsRef.valueChanges();
    return this.uploads;
  }

  pushUpload(archivo: Archivo) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${archivo.file.name}`).put(archivo.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot: any) => {
        archivo.progress = (snapshot.bytesTransferred / snapshot.totalBytes * 100);
        console.log('Upload is ' + archivo.progress + '% done');

        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
    }, (err) => {
      console.log('err', err);
    }, () => {
        archivo.url = uploadTask.snapshot.downloadURL;
        archivo.name = archivo.file.name;
        this.saveFiledata(archivo);
    });
  }

  private saveFiledata (fichero: Archivo) {
    this.angularFireDatabase.list(`${this.basePath}/`).push(fichero);
  }

  deleteUpload(fichero: Archivo) {
    this.deleteFileData(fichero.$key)
    .then( () => {
      this.deleteFileStorage(fichero.name);
    }).catch( err => console.log('err en delete', err));
  }

  // borra los metadatos del fichero
  private deleteFileData(key: string) {
    return this.angularFireDatabase.list(`${this.basePath}/`).remove(key);
  }

  // borra el fichero del storage
  private deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete();
  }

}
