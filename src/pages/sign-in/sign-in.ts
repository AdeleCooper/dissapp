import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { PlannerHomePage } from '../planner-home/planner-home';
import { SignUpPage } from '../sign-up/sign-up';
import { SprintsProvider } from '../../providers/sprints/sprints';

/**
 * Generated class for the SignInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {
  public username1: string;
  public password1: string;
  public email1: string;
  public errorMessage: string;

  constructor(public afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams,
    public sprintsService: SprintsProvider, public toast: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInPage');
  }

  signUp() {
    this.navCtrl.setRoot(SignUpPage);
  }

  async signIn(email, password) {
    console.log(email);
    console.log(password);
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      console.log(result);

      // TODO - change this based on the email address?
      this.sprintsService.setSprintCollectionId('9uovgQw0zVKFdMyMJXNz');

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
