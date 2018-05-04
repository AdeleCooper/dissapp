import { Injectable } from '@angular/core';
import firebase from 'firebase';
import 'firebase/firestore';
import { SprintCollectionsProvider } from '../../providers/sprint-collections/sprint-collections';

/*
  Generated class for the SprintsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SprintsProvider {
  collectionId: any;
  name: string;
  db: any;
  sprint: any;
  SprintCollection: any;
  sprintIds: any;
  newSprintId: any;
  active: any;

  constructor(public sprintCollectionsService: SprintCollectionsProvider) {
    this.db = firebase.firestore();
  }

  setSprintCollectionId(collectionId) {
    this.collectionId = collectionId;
  }

  getSprintCollection(): Promise<any> {
    var self = this;

    return new Promise((resolve, reject) => {
      this.db
        .collection("SprintCollections")
        .doc(self.collectionId)
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

  getSprint(sprintId): Promise<any> {
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

  addSprint(data): Promise<any> {
    return new Promise((resolve, reject) => {
      JSON.stringify(data);
      this.sprintIds = null;
      this.newSprintId = null;
      var self = this;

      // Adds new sprint to Sprints collection
      this.db.collection("Sprints").add(data)
        .then(function (docRef) {
          // Needs other sprints in the sprint collection in order to update Sprint Collection array
          self.getSprintCollection()
            .then((doc) => {
              if (doc) {
                self.sprintIds = doc.data().Sprints;
                self.sprintIds.push(docRef.id);
              }
              self.sprintCollectionsService.updateSprintCollection(self.collectionId/*'9uovgQw0zVKFdMyMJXNz'*/, self.sprintIds);
              resolve(doc);
            })
            .catch((error: any) => {
              console.error("getSprints - error received: " + error);
            });
        })
        .catch((error: any) => {
          reject(error);
        });

    });
  }

  editSprint(data): Promise<any> {
    return new Promise((resolve, reject) => {
      JSON.stringify(data);
      this.sprintIds = null;
      this.newSprintId = null;
      var self = this;

      // Adds new sprint to Sprints collection
      this.db.collection("Sprints")
        .doc(data.ID)
        .set(data)
        .then(function () {
          resolve();
        }).catch((error: any) => {
          reject(error);
        });
    });
  }

  updateTasks(data, sprintId) {
    this.db.collection("Sprints").doc(sprintId).update({ Tasks: data })
      .catch((error: any) => {
        console.error("getSprints - error received: " + error);
      });
  }
}
