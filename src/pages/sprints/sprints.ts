import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
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
    this.getSprints();
    var self = this;

    this.events.subscribe('tasks:changed', (data) => {
      self.currentSprintTasks = data.tasks;
    });

    this.events.subscribe('sprint:changed', (data) => {
      var sprint = data.sprint;
      var sprintToUpdate = null;
      if (sprint.ID == this.currentSprint.id) {
        sprintToUpdate = this.currentSprint;
      } else {
        for (var i = 0; i < this.inactiveSprints.length; i++) {
          if (sprint.ID == this.inactiveSprints[i].id) {
            sprintToUpdate = this.inactiveSprints[i];
            break;
          }
        }
      }

      if (sprintToUpdate) {
        sprintToUpdate.Title = sprint.Title;
        sprintToUpdate.StartDate = sprint.StartDate;
        sprintToUpdate.EndDate = sprint.EndDate;
        sprintToUpdate.Notes = sprint.Notes;
        sprintToUpdate.Status = sprint.Status;
      }
    });
  }

  fixupDate(date) {
    var d = new Date(date);
    return d.toLocaleDateString("en-GB");
  }

  getSprints() {
    this.inactiveSprints = [];
    this.currentSprint = null;
    this.currentSprintTasks = [];
    this.otherSprintIds = [];
    var self = this;

    this.sprintsService.getSprintCollection()
      .then((doc) => {
        if (doc) {
          if (doc.data().Sprints.length > 0) {
            self.sprintIds = doc.data().Sprints;

            self.sprintIds.forEach(id => {
              self.sprintsService.getSprint(id).then((doc) => {
                var sprint = doc.data();
                sprint.id = id;
                sprint.StartDate = self.fixupDate(sprint.StartDate);
                sprint.EndDate = self.fixupDate(sprint.EndDate);

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
                  self.otherSprintIds.push(id);
                }
              });
            });
          }
        }
      })
      .catch((error: any) => {
        console.error("getSprints - error received: " + error);
      });
  }

  addSprintClicked(): void {
    let modal = this.modalCtrl.create(SprintFormPage);
    var self = this;

    modal.onDidDismiss(data => {
      if (!data) {
        return;
      } else {
        self.sprintsService.addSprint(data).then((doc) => {
          self.getSprints();
        });
      }
    });
    modal.present();
  }

  showCurrentSprintClicked(): void {
    this.navCtrl.push(CurrentSprintPage, this.currentSprint);
  }

  showSprintClicked(sprint, i): void {
    this.navCtrl.push(CurrentSprintPage, sprint);
  }
}
