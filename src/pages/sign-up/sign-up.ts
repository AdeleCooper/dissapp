import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { PlannerHomePage } from '../planner-home/planner-home';
import { SignInPage } from '../sign-in/sign-in';

/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  public username1: string;
  public password1: string;
  public email1: string;
  public errorMessage: string;

  constructor(public afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public toast: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  signIn() {
    this.navCtrl.setRoot(SignInPage);
  }

  async signUp(email, password) {
    console.log(email);
    console.log(password);
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
      console.log(result);
      this.navCtrl.push(PlannerHomePage);
    } catch (e) {
      this.errorMessage = e.message;
      console.error(e.message);
      this.toast.create({
        message: e.message,
        duration: 3000
      }).present();
    }
  }

}
