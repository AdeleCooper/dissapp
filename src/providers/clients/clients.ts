import { Injectable } from '@angular/core';
import firebase from 'firebase';
import 'firebase/firestore';

@Injectable()
export class ClientsProvider {
  name: string;
  db: any;

  constructor() {
    this.db = firebase.firestore();
  }

  getClient(clientId): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .collection("Clients")
        .doc(clientId)
        .get()
        .then((doc: any) => {
          if (doc.exists) {
            resolve(doc);
          } else {
            reject("doc doesn't exist");
          }
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  addClient(data): Promise<any> {
    return new Promise((resolve, reject) => {
      JSON.stringify(data);
      this.db
        .collection("Clients")
        .add(data)
        .then(function (docRef) {
          resolve(docRef);
        }).catch((error: any) => {
          reject(error);
        });
    });
  }

  updateClient(id, data): Promise<any> {
    return new Promise((resolve, reject) => {
      JSON.stringify(data);
      this.db
        .collection("Clients")
        .doc(id)
        .update(data)
        .then(function () {
          resolve();
        }).catch((error: any) => {
          reject(error);
        });
    });
  }
}
