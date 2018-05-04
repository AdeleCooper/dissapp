import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { TasksProvider } from '../../providers/tasks/tasks';
import { SprintsProvider } from '../../providers/sprints/sprints';
import { TaskFormPage } from '../task-form/task-form';

/**
 * Generated class for the TasksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tasks',
  templateUrl: 'tasks.html',
})
export class TasksPage {
  pageTitle: any;
  tasks: any = [];
  sprintid: any;
  active: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController,
    public tasksService: TasksProvider,
    public sprintsService: SprintsProvider, public events: Events) {
    this.pageTitle = this.navParams.get('Title');
    this.tasks = this.navParams.get('Tasks');
    this.sprintid = this.navParams.get('SprintId');
    this.active = this.navParams.get('Active');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TasksPage');
  }

  deleteTask(task) {
    console.log("delete");
    var self = this;
    this.tasksService.deleteTask(task.id, this.sprintid, this.tasks).then((remainingTasks) => {
      for (var i = 0; i < self.tasks.length; i++) {
        if (self.tasks[i].id == task.id) {
          self.tasks.splice(i, 1);
          break;
        }
      }
      self.sprintsService.updateTasks(remainingTasks, self.sprintid);

      if (self.active) {
        console.log("hewwooo delete");
        self.events.publish('tasks:changed', { tasks: self.tasks});
      }
    });
  }

  editTask(task) {
    console.log("edit");

    var self = this;
    var formParams = { Task: task};
    let modal = this.modalCtrl.create(TaskFormPage, formParams);

    modal.onDidDismiss(data => {
        if (!data) {
          console.info('task add cancelled');
          return;
        }

        self.tasksService.editTask(data).then(() => {
          task.Description = data.Description;
          task.Size = data.Size;

          if (self.active) {
            console.log("edit tasks success - publishing event");
            self.events.publish('tasks:changed', { tasks: self.tasks});
          }          
        });
    });
    modal.present();    

  }

  addTask() {
    var self = this;
    //create task form modal 
    let modal = this.modalCtrl.create(TaskFormPage);
    modal.onDidDismiss(data => {
        if (!data) {
          console.info('add task cancelled');
          return;
        }
        self.tasksService.addTask(data, self.sprintid, self.tasks).then((doc) => {
          data.id = doc.id;
          self.tasks.push(data);
          self.tasksService.editTask(data);
          if (self.active) {
            self.events.publish('tasks:changed', { tasks: self.tasks});
          }
        });
    });
    modal.present();

  }
}

