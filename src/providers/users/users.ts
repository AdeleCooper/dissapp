import { Injectable } from '@angular/core';
import firebase from 'firebase';
import 'firebase/firestore';

@Injectable()
export class UsersProvider {
  db: any;

  constructor() {
    this.db = firebase.firestore();
  }

  getUser(uid): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .collection("Users")
        .doc(uid)
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

  createUser(uid, data): Promise<any> {
    return new Promise((resolve, reject) => {
      JSON.stringify(data);
      this.db
        .collection("Users").doc(uid)
        .set(data)
        .then(function () {
          resolve();
        }).catch((error: any) => {
          reject(error);
        });
    });
  }
}
