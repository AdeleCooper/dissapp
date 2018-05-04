import { Injectable } from '@angular/core';
import firebase from 'firebase';
import 'firebase/firestore';

@Injectable()
export class PlannersProvider {
  name: string;
  db: any;

  constructor() {
    this.db = firebase.firestore();
  }

  getPlanner(plannerId): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .collection("Planners")
        .doc(plannerId)
        .get()
        .then((doc: any) => {
          if (doc.exists) {
            resolve(doc);
          } else {
            reject("doc doesn't exist");
          }
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  addPlanner(data): Promise<any> {
    return new Promise((resolve, reject) => {
      JSON.stringify(data);
      this.db
        .collection("Planners")
        .add(data)
        .then(function (docRef) {
          resolve(docRef);
        }).catch((error: any) => {
          reject(error);
        });
    });
  }

  updatePlanner(plannerid, data): Promise<any> {
    return new Promise((resolve, reject) => {
      JSON.stringify(data);
      this.db
        .collection("Planners").doc(plannerid)
        .update(data)
        .then(function () {
          resolve();
        }).catch((error: any) => {
          reject(error);
        });
    });
  }
}
