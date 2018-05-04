import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
/**
 * Generated class for the CrudComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
interface Product {
  name: string,  
  description: string,
  quantity: number
}

@Component({
  selector: 'crud',
  templateUrl: 'crud.html'
})


export class CrudComponent {

  text: string;
  products: Observable<Product[]>;
  productsCollectionRef: AngularFirestoreCollection<Product>;

  constructor(public afAuth: AngularFireAuth, afs: AngularFirestore) {
    this.afAuth.auth.signInAnonymously();
    this.products = this.productsCollectionRef.valueChanges();
  }
}
