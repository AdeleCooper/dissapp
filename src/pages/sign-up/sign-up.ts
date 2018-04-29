import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { PlannerHomePage } from '../planner-home/planner-home';
import { SignInPage } from '../sign-in/sign-in';
import { ClientHomePage } from '../client-home/client-home';
import { SignUpOnboardingPage } from '../sign-up-onboarding/sign-up-onboarding';
import { ClientsProvider } from '../../providers/clients/clients';


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
  public type: string;

  constructor(public afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams,public clientsService: ClientsProvider, public toast: ToastController) {
    this.type = this.navParams.get("Type");
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
      console.log(result.uid);
      
      if (this.type == "Client"){
        console.log("client created");
        this.toast.create({
          message: "Account Created - Welcome!",
          duration: 5000
        }).present();
        this.setUpClient(result.uid);
        // this.navCtrl.setRoot(ClientHomePage);

      }else if(this.type == "Planner"){
        console.log("planner created");
        this.toast.create({
          message: "Account Created - Welcome!",
          duration: 5000
        }).present();
        this.setUpPlanner(result.uid);

      }else{
        this.toast.create({
          message: "Whoops, something went wrong. Please try again!",
          duration: 4000
        }).present();
        this.navCtrl.setRoot(SignInPage);
      }
    } catch (e) {
      this.errorMessage = e.message;
      console.error(e.message);
      this.toast.create({
        message: e.message,
        duration: 3000
      }).present();
    }
  }

  setUpClient(uid){
    var clientData = {
      Location1: "Location",
      Name: "name",
      PlannerID: "",
      ID: "",
    }

    this.clientsService.addClient(clientData).then((doc) => {
      console.log(doc.id);
      var id = doc.id;
    });

    // this.clientsService.addClient(clientData)

    var userData = {
      ID: "clientID",
      Type: "Client"
    }




    //this.navCtrl.setRoot(ClientHomePage);
  }

  setUpPlanner(uid){
    var plannerData = {
      Name: "name",
      SprintCollectionID: "sprincollid",
      Clients: []
    }


    var userData = {
      ID: "plannerID",
      Type: "Planner"
    }
    this.navCtrl.setRoot(PlannerHomePage);

  }


}
