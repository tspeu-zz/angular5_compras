import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { Archivo } from '../uploads/file.modal';
import { v4 as uuid } from 'uuid';

@Injectable()
export class LoadfileService {

// raiz en la db dsonde se guardan los archivos
private basePath = '/uploads';

uploadsRef: AngularFireList<Archivo>;

uploads: Observable<any[]>;

constructor(private angularFireDatabase: AngularFireDatabase) { 

              let Uuid =  uuid(); //<-- use it
            }


  getUploads() {
    this.uploadsRef = this.angularFireDatabase.list(this.basePath);
    this.uploads = this.uploadsRef.valueChanges();
    return this.uploads;
  }

  pushUpload(archivo: Archivo) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${archivo.file.name}`).put(archivo.file);
    console.log("uploadTask-->", uploadTask);

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
        console.log("--archivo-> ", archivo);
        this.saveFiledata(archivo);
        let _key = archivo.$key;
        console.log('_KEY', _key);
    });
  }

  private saveFiledata (fichero: Archivo) {
    console.log('<--- el fichero saveFiledata -->', fichero);
    this.angularFireDatabase.list(`${this.basePath}/`).push(fichero);
  }

  deleteUpload(fichero: Archivo) {
    console.log('<--- el ficheroa  deleteUpload -->', fichero);
    let _key = fichero.$key;
    console.log('_KEY deleteUpload --> ', _key);
    // this.deleteFileData(fichero.$key)
    this.deleteFileStorage(fichero.name)
    .then( () => {
      console.log('deleteFileData KEY', fichero);
      // this.getUploads();
    }).catch( err => console.log('err en delete', err));
  }

  // borra los metadatos del fichero
  private deleteFileData(key: string) {
    console.log('deleteFileData KEY', key);
    console.log(`ESOTE ES--> ${this.basePath}/key`);
    // return this.angularFireDatabase.list(`${this.basePath}/`).remove(key);
    //return this.angularFireDatabase.list(`${this.basePath}/`).remove(key);
    return this.angularFireDatabase.object(`${this.basePath}/key`).remove();
    //list(`${this.basePath}/`).remove(key);
  }

/*  TODO  deleteItem(key: string) {
    this.itemsRef.remove(key);
  }
*/


  // borra el fichero del storage
  private deleteFileStorage(name: string) {
    console.log('name deleteFileStorage --> ', name);
    console.log(`ESTP ES --> BASEPATH  -> ${this.basePath}/${name}`);
    const storageRef = firebase.storage().ref();
    return storageRef.child(`${this.basePath}/${name}`).delete();
  }

}
