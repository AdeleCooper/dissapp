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
  name: string;
  db: any;
  sprint: any;
  SprintCollection: any;
  sprintIds: any;
  newSprintId: any;

  constructor(public sprintCollectionsService: SprintCollectionsProvider) {
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

  // addSprint(data) {
  //   JSON.stringify(data);
  //   this.sprintIds = null;
  //   this.newSprintId = null;
  //   var self = this;

  //   // Adds new sprint to Sprints collection
  //   this.db.collection("Sprints").add(data
  //   ).then(function(docRef) {
  //     console.log("Document written with ID: ", docRef.id);
  //     // Needs other sprints in sprint collection in order to update Sprint Collectionn array
  //     self.getSprintCollection('9uovgQw0zVKFdMyMJXNz').then((doc) =>
  //     {
  //       if (doc) {
  //         self.sprintIds = doc.data().Sprints;
  //         console.log(self.sprintIds);
  //         self.sprintIds.push(docRef.id);
  //         console.log(self.sprintIds);
  //       }
  //     self.sprintCollectionsService.updateSprintCollection('9uovgQw0zVKFdMyMJXNz',self.sprintIds);
  //     })
  //     .catch((error: any) =>
  //     {
  //       console.error("getSprints - error received: " + error);
  //     });
      
  // }).catch((error: any) => {
  //     console.log('rejecting due to error: ' + error);
  //   });
  // }


  addSprint(data): Promise<any> {
    return new Promise((resolve, reject) => {
      JSON.stringify(data);
      this.sprintIds = null;
      this.newSprintId = null;
      var self = this;
  
      // Adds new sprint to Sprints collection
      this.db.collection("Sprints").add(data
      ).then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        // Needs other sprints in sprint collection in order to update Sprint Collectionn array
        self.getSprintCollection('9uovgQw0zVKFdMyMJXNz').then((doc) =>
        {
          if (doc) {
            self.sprintIds = doc.data().Sprints;
            console.log(self.sprintIds);
            // change .push to "docRef.id"
            self.sprintIds.push("W4qnMIccMnSnaB7alf5t");
            console.log(self.sprintIds);
          }
        self.sprintCollectionsService.updateSprintCollection('9uovgQw0zVKFdMyMJXNz',self.sprintIds);
        resolve(doc);
        })
        .catch((error: any) =>
        {
          console.error("getSprints - error received: " + error);
        });
        
    }).catch((error: any) => {
        console.log('rejecting due to error: ' + error);
        reject(error);
      });

    });
  }

}




