import { Injectable } from '@angular/core';
import firebase from 'firebase';
import 'firebase/firestore';

/*
  Generated class for the SprintsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SprintsProvider {
  name: string;
  db:any;

  constructor() {
    this.db = firebase.firestore();    
  }

  getSprintCollection(collectionId): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .collection("SprintCollections")
        .doc(collectionId)
        .get()
        .then((doc: any) => {
          if (doc.exists) {
            //console.log('resolving');
            resolve(doc);
          } else {
            //console.log('rejecting due to non-existent doc');
            reject("collection doesn't exist");
          }
        })
        .catch((error: any) => {
          console.log('rejecting due to error: ' + error);
          reject(error);
        });
    });
  }

  getSprint(sprintId): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .collection("Sprints")
        .doc(sprintId)
        .get()
        .then((doc: any) => {
          if (doc.exists) {
            //console.log('resolving');
            resolve(doc);
          } else {
            //console.log('rejecting due to non-existent doc');
            reject("collection doesn't exist");
          }
        })
        .catch((error: any) => {
          console.log('rejecting due to error: ' + error);
          reject(error);
        });
    });
  }  
}
