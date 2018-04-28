import { Injectable } from '@angular/core';
import firebase from 'firebase';
import 'firebase/firestore';
import { SprintsProvider } from '../../providers/sprints/sprints';

/*
  Generated class for the SprintsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TasksProvider {
  name: string;
  db:any;

  constructor(public sprintsService: SprintsProvider) {
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
  addTask(data,sprintid, tasks): Promise<any> {
    return new Promise((resolve, reject) => {
      JSON.stringify(data);
      var self = this;
      var taskids = [];
      tasks.forEach(element => {
        taskids.push(element.id);
      });
      // Adds new task to Sprint
      this.db.collection("Tasks").add(data
      ).then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        console.log(taskids);
        taskids.push(docRef.id);
        console.log(taskids);
        self.sprintsService.updateTasks(taskids, sprintid);
        resolve(docRef);
    }).catch((error: any) => {
        console.log('rejecting due to error: ' + error);
        reject(error);
      });

    });

  }  
  editTask(taskId, data){
    // return new Promise((resolve, reject) => {
      console.log(data.id);
      this.db
        .collection("Tasks")
        .doc(data.id)
        .set(data)
        // .then((doc: any) => {
        //   if (doc.exists) {
        //     //console.log('resolving');
        //     resolve(doc);
        //   } else {
        //     //console.log('rejecting due to non-existent doc');
        //     reject("Task doesn't exist");
        //   }
        // })
        .catch((error: any) => {
          console.log('rejecting due to error: ' + error);
          //reject(error);
        });
    // });
  }
  deleteTask(taskId, sprintid, tasks): Promise<any> {
    return new Promise((resolve, reject) => {
      var self = this;
      var newtasks = [];
      var taskstoreturn = [];
      this.db
        .collection("Tasks")
        .doc(taskId)
        .delete()
        .then((doc: any) => {
          tasks.forEach(element => {
            if (element.id == taskId){
              console.log("found task to delete");
            }else {
              taskstoreturn.push(element.id);
            }
            resolve(taskstoreturn);
          });
          //tasks.pop(taskId);
        })
        .catch((error: any) => {
          console.log('rejecting due to error: ' + error);
          reject(error);
        });
      });
  }    
  // moveTask(taskId, sprintid): Promise<any> {

  //   //need to get tasks from new sprint!! maybe remove??
  //   //will need to get list of all sprint ids to choose from a drop down menu
    
  //   return new Promise((resolve, reject) => {
  //     this.db
  //       .collection("Tasks")
  //       .doc(taskId)
  //       .get()
  //       .then((doc: any) => {
  //         if (doc.exists) {
  //           //console.log('resolving');
  //           resolve(doc);
  //         } else {
  //           //console.log('rejecting due to non-existent doc');
  //           reject("Task doesn't exist");
  //         }
  //       })
  //       .catch((error: any) => {
  //         console.log('rejecting due to error: ' + error);
  //         reject(error);
  //       });
  //   });
  // }  



}



// WEBPACK FOOTER //
// ./src/providers/tasks/tasks.ts