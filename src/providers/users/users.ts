// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import 'firebase/firestore';
/*
  Generated class for the UsersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsersProvider {
  db: any;

  constructor() {
    console.log('Hello UsersProvider Provider');
    this.db = firebase.firestore();
  }


  getUser(uid): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log(uid);
      this.db
        .collection("Users")
        .doc(uid)
        .get()
        .then((doc: any) => {
          if (doc.exists) {
            console.log('resolving');
            console.log(doc);
            resolve(doc);
          } else {
            console.log('rejecting due to non-existent doc');
            reject("collection doesn't exist");
          }
        })
        .catch((error: any) => {
          console.log('rejecting due to error: ' + error);
          reject(error);
        });
    });
  }


}
