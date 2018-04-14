import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import firebase from 'firebase';
import 'firebase/firestore';
import {ClientsProvider} from '../../providers/clients/clients';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public myService : ClientsProvider) {
    console.log("inside");
    this.getData();

    // let db = firebase.firestore();

    // db.collection("users").doc("new").set({
    //   name: "john"
    // }
    // ).then((data)=>{
    //   console.log(data)
    //   console.log("hi")})
    // // }).catch((error)=>{
    // //   console.log("error")
    // // })

    // console.log("inside2");

  };
  
  getData(){
    var client = this.myService.getClient();
    if (client) {
      console.info('client name: ' + client.name);
    }
    
    //this.myService.addClient();
    //this.myService.updateClient();
  }
}
