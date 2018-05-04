import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { PlannerHomePage } from '../planner-home/planner-home';
import { ClientHomePage } from '../client-home/client-home';
import { SignUpOnboardingPage } from '../sign-up-onboarding/sign-up-onboarding';
import { SprintsProvider } from '../../providers/sprints/sprints';
import { UsersProvider } from '../../providers/users/users';

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
    public sprintsService: SprintsProvider, public usersService: UsersProvider, public toast: ToastController) {
  }

  signUp() {
    this.navCtrl.push(SignUpOnboardingPage);
  }

  async signIn(email, password) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      var uid = result.uid;

      this.usersService.getUser(uid).then((doc) => {
        var dataReturned = doc.data();
        var data = {
          id: dataReturned.ID
        }

        if (dataReturned.Type == "Planner") {
          this.navCtrl.setRoot(PlannerHomePage, data);
        } else if (dataReturned.Type == "Client") {
          this.navCtrl.setRoot(ClientHomePage, data);
        }
      });
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
