import { Injectable } from '@angular/core';
import firebase from 'firebase';
import 'firebase/firestore';
/*
  Generated class for the PlannersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PlannersProvider {
  name: string;
  db: any;

  constructor() {
    console.log('Hello PlannersProvider Provider');
    this.db = firebase.firestore();


    console.log("HrrQGLqfoIodRJ3JctCo");
  }

  getPlanner(plannerId): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .collection("Planners")
        .doc(plannerId)
        .get()
        .then((doc: any) => {
          if (doc.exists) {
            //console.log('resolving');
            resolve(doc);
          } else {
            //console.log('rejecting due to non-existent doc');
            reject("doc doesn't exist");
          }
        })
        .catch((error: any) => {
          console.log('rejecting');
          reject(error);
        });
    });
  }

  addPlanner(data): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log(data);
      JSON.stringify(data);
      this.db
        .collection("Planners")
        .add(data)
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
          resolve(docRef);
      }).catch((error: any) => {
          console.log('rejecting due to error: ' + error);
          reject(error);
        });
    });
  }

  deletePlanner() {
  }

  updatePlanner(plannerid, data): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log(data);
      JSON.stringify(data);
      this.db
        .collection("Planners").doc(plannerid)
        .update(data)
        .then(function() {
          resolve();
      }).catch((error: any) => {
          console.log('rejecting due to error: ' + error);
          reject(error);
        });
    });
 // this.db.collection("Planners").doc(plannerid).update(data);
  }
}