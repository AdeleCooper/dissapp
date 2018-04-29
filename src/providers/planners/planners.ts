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

  addPlanner() {

    //change to plannner fields

    this.db.collection("Planners").add({
      email: "another@example.com",
      img: "path/img.jpg",
      location: "Cambridge",
      name: "adele"
    });

    // db.collection("users").doc("new1").set({
    //   name: "john"
    // }
    // ).then((data)=>{
    //   console.log(data)
    //   console.log("hi")})
  }

  deletePlanner() {
  }

  updatePlanner() {
    this.db.collection("Planners").doc("HrrQGLqfoIodRJ3JctCo").update({
      location: "London"
    });
  }
}

