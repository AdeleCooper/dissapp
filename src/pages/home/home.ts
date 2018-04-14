import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import firebase from 'firebase';
import 'firebase/firestore';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    console.log("inside");
    let db = firebase.firestore();

    db.collection("users").doc("new").set({
      name: "john"
    }
    ).then((data)=>{
      console.log(data)
      console.log("hi")})
    // }).catch((error)=>{
    //   console.log("error")
    // })

    console.log("inside2");

  };

}
