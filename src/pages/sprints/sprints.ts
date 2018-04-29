import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
//import firebase from 'firebase';
import 'firebase/firestore';
import { SprintsProvider } from '../../providers/sprints/sprints';
import { TasksProvider } from '../../providers/tasks/tasks';
import { ClientsProvider } from '../../providers/clients/clients';
import { SprintFormPage } from '../sprint-form/sprint-form';
import { CurrentSprintPage } from '../current-sprint/current-sprint';

/**
 * Generated class for the SprintsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sprints',
  templateUrl: 'sprints.html',
})
export class SprintsPage {
  public currentSprint: any;
  public currentSprintTasks: any = [];
  public inactiveSprints: any = [];
  public sprintIds: any = [];
  public otherSprintIds: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController,
    public sprintsService: SprintsProvider, public tasksService: TasksProvider, public events: Events) {
    console.log('SprintsPage constructor');
    this.getSprints();
    var self = this;

    //NOT SUBSCRIBING! :(
    this.events.subscribe('tasks:changed', (data) => {
      self.currentSprintTasks = data.tasks;
      console.log("subscribe ps" + data.tasks);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SprintsPage');
  }

  fixupDate(date) {
    var d = new Date(date);
    return d.toLocaleDateString("en-GB");
  }

  getSprints() {
    console.log("inside get sprints");
    // TODO: The collection id can be supplied as a param to this function when the login page switches to this page
    this.inactiveSprints = [];
    this.currentSprint = null;
    this.currentSprintTasks = [];
    this.otherSprintIds = [];
    var self = this;

    this.sprintsService.getSprintCollection(/*'9uovgQw0zVKFdMyMJXNz'*/).then((doc) => {
      if (doc) {
        //var x = doc.data();
        self.sprintIds = doc.data().Sprints;

        self.sprintIds.forEach(id => {
          self.sprintsService.getSprint(id).then((doc) => {
            var sprint = doc.data();
            sprint.id = id;
            //var date = new Date(sprint.StartDate);
            sprint.StartDate = self.fixupDate(sprint.StartDate);//date.toLocaleDateString("en-GB");
            sprint.EndDate = self.fixupDate(sprint.EndDate);//date.toLocaleDateString("en-GB");

            if (sprint.Active) {
              self.currentSprint = sprint;
              // As soon as the current sprint is located, request the tasks associated with that sprint
              if (sprint.Tasks) {
                sprint.Tasks.forEach(task => {
                  self.tasksService.getTask(task).then((doc) => {
                    var task = doc.data();
                    self.currentSprintTasks.push(task);
                  })
                });
              }
            } else {
              self.inactiveSprints.push(sprint);
              console.log(self.inactiveSprints);
              self.otherSprintIds.push(id);
            }
          });
        });
      }
    })
      .catch((error: any) => {
        console.error("getSprints - error received: " + error);
      });
  }

  addSprintClicked(): void {
    console.log("addSprintClicked");
    let modal = this.modalCtrl.create(SprintFormPage);

    var self = this;

    modal.onDidDismiss(data => {
      if (!data) {
        console.log("exit");
        return;
      } else {
        self.sprintsService.addSprint(data).then((doc) => {
          self.getSprints();
          console.log("inside .then")
        }
        );
      }

      //console.log('add sprint data: ' + JSON.stringify(data));
      // self.sprintsService.addSprint(data).then((doc) => {
      //   self.getSprints();
      //   console.log("inside .then")
      // }
      // );
      // TODO - then try calling self.getSprints to re-fetch all sprints and update UI
    });
    modal.present();
  }
  showCurrentSprintClicked(): void {
    console.log("showCurrentSprintClicked");
    //this.navCtrl.push('SprintsPage');
    this.navCtrl.push(CurrentSprintPage, this.currentSprint);
  }

  showSprintClicked(sprint, i): void {
    //console.log(sprint);
    console.log("showSprintClicked");
    //var sprintID = this.otherSprintIds[i-1];

    //sprint.id = this.otherSprintIds[i-1];
    console.log(sprint.id + sprint);
    this.navCtrl.push(CurrentSprintPage, sprint);
  }



}
