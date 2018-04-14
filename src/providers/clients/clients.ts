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
  //public http: HttpClient
  name: string;
  db:any;

  constructor() {
    this.db = firebase.firestore();
  }

  getClient(){
    //let db = firebase.firestore();

  //   db.collection("Clients").doc("KXLiOkFJOrDfrW7oVz3S").get().then((data)=>{
  //        console.log(data.id)});
  // }

    this.db.collection("Clients").doc("KXLiOkFJOrDfrW7oVz3S").get().then(function (doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        //console.log(doc.data.toString);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
  };


  addClient(){

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

  deleteClient(){

  }

  updateClient(){

    this.db.collection("Clients").doc("tafa7E1ssj391krsHbcK").update({
      location: "London"

    });

  }


}
