import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import 'firebase/firestore';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public sprintsService: SprintsProvider, public tasksService: TasksProvider, public plannersService: PlannersProvider) {
    console.log("Planner Home page constructor");
    this.getPlannerInfo(this.navParams.get("id"));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlannerHomePage');
  }

  getCurrentSprint() {
    this.currentSprint = null;
    this.currentSprintTasks = [];
    this.sprintId = null;
    this.taskCount = 0;
    var self = this;

    this.sprintsService.getSprintCollection(/*'9uovgQw0zVKFdMyMJXNz'*/).then((doc) => {
      if (doc) {
        //var x = doc.data();
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
          console.log(self.currentSprint.CompletedTasks +"/"+sprint.Tasks.length + " = " + self.progressBarValue);
          (<HTMLInputElement>document.getElementById('progressbar')).value = self.progressBarValue;
        });
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
        console.log(self.planner.Name);
        self.name = self.planner.Name;
        self.clientNumber = self.planner.Clients.length;
        console.log(self.clientNumber);
        self.sprintsService.setSprintCollectionId(self.planner.SprintCollectionID);
        this.getCurrentSprint();
      }
    }
    ).catch((error: any) => {
      console.error("getSprint - error received: " + error);
    });
  }
  
  sprintsClicked() {
    //var data = { Clients: this.clients};
    this.navCtrl.push(SprintsPage);
  }

  clientsClicked() {
    var data = { Clients: this.clients};
    this.navCtrl.push(ClientsPage, data);
  }
}
