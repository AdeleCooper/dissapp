import { Injectable } from '@angular/core';
import firebase from 'firebase';
import 'firebase/firestore';

@Injectable()
export class SprintCollectionsProvider {
  db: any;

  constructor() {
    this.db = firebase.firestore();
  }

  getSprints(sprintId): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .collection("Sprints")
        .doc(sprintId)
        .get()
        .then((doc: any) => {
          if (doc.exists) {
            resolve(doc);
          } else {
            reject("collection doesn't exist");
          }
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  updateSprintCollection(docID, sprintsArray) {
    this.db.collection("SprintCollections").doc(docID).update({ Sprints: sprintsArray })
      .catch((error: any) => {
      });
  }

  addSprintCollection(data): Promise<any> {
    return new Promise((resolve, reject) => {
      JSON.stringify(data);
      this.db
        .collection("SprintCollections")
        .add(data)
        .then(function (docRef) {
          resolve(docRef);
        }).catch((error: any) => {
          reject(error);
        });
    });
  }
}
