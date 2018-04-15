import { Injectable } from '@angular/core';
import firebase from 'firebase';
import 'firebase/firestore';

/*
  Generated class for the SprintsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TasksProvider {
  name: string;
  db:any;

  constructor() {
    this.db = firebase.firestore();    
  }

  getTask(taskId): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .collection("Tasks")
        .doc(taskId)
        .get()
        .then((doc: any) => {
          if (doc.exists) {
            //console.log('resolving');
            resolve(doc);
          } else {
            //console.log('rejecting due to non-existent doc');
            reject("Task doesn't exist");
          }
        })
        .catch((error: any) => {
          console.log('rejecting due to error: ' + error);
          reject(error);
        });
    });
  }  
}
