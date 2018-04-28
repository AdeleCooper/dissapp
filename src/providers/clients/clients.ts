//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import 'firebase/firestore';
/*
  Generated class for the ClientsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
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
        //.doc("KXLiOkFJOrDfrW7oVz3S")
        .doc(clientId)
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

  addClient() {

    this.db.collection("Clients").add({
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

  deleteClient() {
  }

  updateClient() {
    this.db.collection("Clients").doc("tafa7E1ssj391krsHbcK").update({
      location: "London"
    });
  }
}
