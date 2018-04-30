import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { PlannerHomePage } from '../planner-home/planner-home';
import { SignInPage } from '../sign-in/sign-in';
import { ClientHomePage } from '../client-home/client-home';
import { SignUpOnboardingPage } from '../sign-up-onboarding/sign-up-onboarding';
import { ClientsProvider } from '../../providers/clients/clients';
import { UsersProvider } from '../../providers/users/users';
import { SprintCollectionsProvider } from '../../providers/sprint-collections/sprint-collections';
import { PlannersProvider } from '../../providers/planners/planners';


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
  public location1: string;
  public errorMessage: string;
  public type: string;

  constructor(public afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public plannersService: PlannersProvider, public sprintCollectionsService: SprintCollectionsProvider, public usersService: UsersProvider, public clientsService: ClientsProvider, public toast: ToastController) {
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

      if (this.type == "Client") {
        console.log("client created");
        this.toast.create({
          message: "Account Created - Welcome!",
          duration: 5000
        }).present();
        this.setUpClient(result.uid);
        // this.navCtrl.setRoot(ClientHomePage);

      } else if (this.type == "Planner") {
        console.log("planner created");
        this.toast.create({
          message: "Account Created - Welcome!",
          duration: 5000
        }).present();
        this.setUpPlanner(result.uid);

      } else {
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

  setUpClient(uid) {
    var clientData = {
      Location1: this.location1,
      Name: this.username1,
      PlannerID: "",
      ID: "",
      Tasks: []
    }
    var self = this;
    this.clientsService.addClient(clientData).then((doc) => {
      console.log(doc.id);
      var id = doc.id;
      var userData = {
        ID: id,
        Type: "Client"
      }
      var updateData = {
        ID: id
      }
      self.clientsService.updateClient(id, updateData).then((doc) => {
        console.log("client id updated!");
        self.usersService.createUser(uid, userData).then((doc) => {
          console.log('complete!');
          this.navCtrl.setRoot(ClientHomePage, { id: id });
        });
      });
    });
  }

  setUpPlanner(uid) {
    var self = this;
    this.sprintCollectionsService.addSprintCollection({ Sprints: [], ActiveSprint: null}).then((doc) => {
      console.log(doc.id);
      var plannerData = {
        Name: self.username1,
        Location: self.location1,
        SprintCollectionID: doc.id,
        Clients: []
      }
      self.plannersService.addPlanner(plannerData).then((doc2) => {
        var userData = {
          ID: doc2.id,
          Type: "Planner"
        }
        self.usersService.createUser(uid, userData).then((doc) => {
          console.log('added planner!');
          this.navCtrl.setRoot(PlannerHomePage, { id: doc2.id });
        });

      })


    })
  }


}
