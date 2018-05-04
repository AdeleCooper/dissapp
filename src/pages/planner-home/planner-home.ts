import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import 'firebase/firestore';
import { SignInPage } from '../../pages/sign-in/sign-in';
import { AngularFireAuth } from 'angularfire2/auth';
import { ClientsPage } from '../../pages/clients/clients';
import { SprintsPage } from '../../pages/sprints/Sprints';
import { SprintsProvider } from '../../providers/sprints/sprints';
import { TasksProvider } from '../../providers/tasks/tasks';
import { ClientsProvider } from '../../providers/clients/clients';
import { PlannersProvider } from '../../providers/planners/planners';

/**
 * Generated class for the PlannerHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-planner-home',
  templateUrl: 'planner-home.html',
})
export class PlannerHomePage {
  public currentSprint: any;
  public currentSprintTasks: any = [];
  public sprintId: any;
  public activeTasks: any;
  public taskCount: number;
  public planner: any;
  public clients: any = [];
  public name: any;
  public clientNumber: any;
  public progressBarValue: any;
  public plannerId: any;

  constructor(public afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public sprintsService: SprintsProvider, public tasksService: TasksProvider, public plannersService: PlannersProvider, public events: Events) {
    this.plannerId = this.navParams.get("id");
    this.getPlannerInfo(this.navParams.get("id"));
    var self = this;
    this.events.subscribe('clients:changed', (data) => {
      self.clients = data.clients;
      self.clientNumber = self.clients.length;
    });
  }

  getCurrentSprint() {
    this.currentSprint = null;
    this.currentSprintTasks = [];
    this.sprintId = null;
    this.taskCount = 0;
    var self = this;

    this.sprintsService.getSprintCollection().then((doc) => {
      if (doc) {
        if (doc.data().ActiveSprint) {
          self.sprintId = doc.data().ActiveSprint;

          self.sprintsService.getSprint(self.sprintId).then((doc) => {
            var sprint = doc.data();
            self.currentSprint = sprint;
            self.taskCount = 0 - self.currentSprint.CompletedTasks;
            if (sprint.Tasks) {
              sprint.Tasks.forEach(task => {
                self.tasksService.getTask(task).then((doc) => {
                  var task = doc.data();
                  self.currentSprintTasks.push(task);
                  self.taskCount += 1;
                })
              });
            }
            if (sprint.Tasks && sprint.Tasks.length) {
              self.progressBarValue = Math.round(self.currentSprint.CompletedTasks / sprint.Tasks.length * 100);
            } else {
              self.progressBarValue = 0;
            }
            (<HTMLInputElement>document.getElementById('progressbar')).value = self.progressBarValue;
          });
        }
      }
    }).catch((error: any) => {
      console.error("getSprint - error received: " + error);
    });
  }

  getPlannerInfo(plannerid) {
    this.planner = null;
    var self = this;
    this.plannersService.getPlanner(plannerid).then((doc) => {
      if (doc) {
        self.planner = doc.data();
        self.clients = self.planner.Clients;
        self.name = self.planner.Name;
        self.clientNumber = self.planner.Clients.length;
        self.sprintsService.setSprintCollectionId(self.planner.SprintCollectionID);
        this.getCurrentSprint();
      }
    }
    ).catch((error: any) => {
      console.error("getSprint - error received: " + error);
    });
  }

  sprintsClicked() {
    this.navCtrl.push(SprintsPage);
  }

  clientsClicked() {
    var data = { Clients: this.clients, PlannerId: this.plannerId };
    this.navCtrl.push(ClientsPage, data);
  }

  logOut() {
    var self = this;
    this.afAuth.auth.signOut().then(function () {
      // Sign-out successful.
      self.navCtrl.setRoot(SignInPage);
    }, function (error) {
      console.log("Log out error: " + error);
    });
  }
}
