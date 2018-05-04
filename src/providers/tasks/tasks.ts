import { Injectable } from '@angular/core';
import firebase from 'firebase';
import 'firebase/firestore';
import { SprintsProvider } from '../../providers/sprints/sprints';

@Injectable()
export class TasksProvider {
  name: string;
  db: any;

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
            resolve(doc);
          } else {
            reject("Task doesn't exist");
          }
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
  addTask(data, sprintid, tasks): Promise<any> {
    return new Promise((resolve, reject) => {
      JSON.stringify(data);
      var self = this;
      var taskids = [];

      tasks.forEach(element => {
        taskids.push(element.id);
      });

      this.db.collection("Tasks").add(data
      ).then(function (docRef) {
        taskids.push(docRef.id);
        self.sprintsService.updateTasks(taskids, sprintid);
        resolve(docRef);
      }).catch((error: any) => {
        reject(error);
      });
    });
  }
  
  editTask(data): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .collection("Tasks")
        .doc(data.id)
        .set(data)
        .then(function () {
          resolve();
        })
        .catch((error: any) => {
          reject(error);
        });
    });
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
            if (element.id == taskId) {
            } else {
              taskstoreturn.push(element.id);
            }
            resolve(taskstoreturn);
          });
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  addClientTask(data): Promise<any> {
    return new Promise((resolve, reject) => {
      JSON.stringify(data);
      this.db.collection("Tasks").add(data
      ).then(function (docRef) {
        resolve(docRef);
      }).catch((error: any) => {
        reject(error);
      });
    });
  }
}
