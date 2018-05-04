import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { ClientsProvider } from '../../providers/clients/clients';
import { TasksProvider } from '../../providers/tasks/tasks';
import { SignInPage } from '../../pages/sign-in/sign-in';

/**
 * Generated class for the ClientHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-client-home',
  templateUrl: 'client-home.html',
})
export class ClientHomePage {
  public clientId: any;
  public clientData: any;
  public name: any;
  public location: any;
  public taskids: any = [];
  public tasks: any = [];

  constructor(public afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public tasksService: TasksProvider, public clientsService: ClientsProvider) {
    this.clientId = this.navParams.get('id');
    this.getClient();
  }

  getClient() {
    this.clientData = null;
    var self = this;
    this.clientsService.getClient(this.clientId).then((doc) => {
      self.clientData = doc.data();
      self.name = self.clientData.Name;
      self.location = self.clientData.Location;
      self.taskids = self.clientData.Tasks;
      self.getTasks();
    });
  }

  getTasks() {
    var self = this;
    this.tasks = [];
    this.taskids.forEach(task => {
      self.tasksService.getTask(task).then((doc) => {
        var task = doc.data();
        self.tasks.push(task);
      })
    });
  }

  refresh() {
    this.getClient();
  }

  logOut() {
    var self = this;
    this.afAuth.auth.signOut().then(function () {
      // Sign-out successful.
      self.navCtrl.setRoot(SignInPage);
    }, function (error) {
      // An error happened.
      console.log("Sign out error: " + error);
    });
  }
}
