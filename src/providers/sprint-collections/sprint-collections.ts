import { Injectable } from '@angular/core';
import firebase from 'firebase';
import 'firebase/firestore';

/*
  Generated class for the SprintCollectionsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
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



  updateSprintCollection(docID, sprintsArray) {
    this.db.collection("SprintCollections").doc(docID).update({ Sprints: sprintsArray })
      .catch((error: any) => {
        console.error("getSprints - error received: " + error);
      });
  }

  addSprintCollection() {

  }

}
