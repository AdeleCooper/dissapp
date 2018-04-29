import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { TasksProvider } from '../../providers/tasks/tasks';
import { SprintsProvider } from '../../providers/sprints/sprints';
import { TasksPage } from '../tasks/tasks';
import { SprintFormPage } from '../sprint-form/sprint-form';

/**
 * Generated class for the CurrentSprintPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-current-sprint',
  templateUrl: 'current-sprint.html',
})
export class CurrentSprintPage {
  taskIds: any;
  otherTasks: any = [];
  completedTasks: any = [];
  currentSprint: any;
  sprintid:any;
  tasks: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController,
    public tasksService: TasksProvider, public sprintsService: SprintsProvider, public events: Events) {
    //his.taskIds = this.navParams.get('Tasks');
    this.currentSprint = {
      Title: this.navParams.get('Title'),
      StartDate: this.navParams.get('StartDate'),
      EndDate: this.navParams.get('EndDate'),
      Active: this.navParams.get('Active'),
      Notes: this.navParams.get('Notes'),
      CompletedTasks: this.navParams.get('CompletedTasks'),
      Status: this.navParams.get('Status'),
      Weight: this.navParams.get('Weight'),
      ID: this.navParams.get('id')
    };
    this.sprintid = this.navParams.get('id');
    console.log(this.taskIds);
    this.getTaskIds();
    //var self = this;
    //this.getTasks();

    // Subscribe to changes made to the list of tasks on the Tasks page
    // this.events.subscribe('tasks:changed', (data) => {
    //   if (data.title == 'Completed Tasks') {
    //     self.completedTasks = data.tasks;
    //   } else if (data.title == 'Outstanding Tasks') {
    //     self.otherTasks = data.tasks;
    //   }
    // });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CurrentSprintPage');
    console.log(this.currentSprint);
  }

  getTaskIds(){
    var self = this;
    this.sprintsService.getSprint(this.sprintid).then((doc) => {
      var sprint = doc.data();
      this.taskIds = sprint.Tasks;
      self.getTasks();
    })
  }

  getTasks() {
    var self = this;
    this.otherTasks = [];
    this.completedTasks = [];
    this.tasks = [];
    
    this.taskIds.forEach(task => {
      self.tasksService.getTask(task).then((doc) => {
        var taskData = doc.data();
        self.tasks.push(taskData);
        taskData.id = task;
        if (taskData.Progress == "Complete") {
          self.completedTasks.push(taskData);
        } else {
          self.otherTasks.push(taskData);
        }
      })
    });
  }

  viewCompletedTasks(){
    var data = {
      Title: "Completed Tasks",
      Tasks: this.completedTasks,
      Active: this.currentSprint.Active,
      SprintId: this.sprintid,
    }
    this.navCtrl.push(TasksPage, data);
  }

  viewTasks(){
    var data = {
      Title: "Outstanding Tasks",
      Tasks: this.otherTasks,
      SprintId: this.sprintid,
      Active: this.currentSprint.Active
    }
    this.navCtrl.push(TasksPage, data);
  }

  editSprint() {
    console.log("editSprint called");
    var self = this;
    var formParams = { Sprint: this.currentSprint };

    let modal = this.modalCtrl.create(SprintFormPage, formParams);

    modal.onDidDismiss(data => {
      if (!data) {
        console.log("editSprint cancelled");
        return;
      } else {
        console.log("editSprint done - updating database");

        data.Tasks = self.tasks;
        self.sprintsService.editSprint(data).then((doc) => {
          //self.getSprints();
          self.currentSprint.Title = data.Title;
          self.currentSprint.StartDate = data.StartDate;
          self.currentSprint.EndDate = data.EndDate;
          self.currentSprint.Notes = data.Notes;
          self.currentSprint.Status = data.Status;

          self.events.publish('sprint:changed', { sprint: self.currentSprint });
        });

        // self.sprintsService.addSprint(data).then((doc) => {
        //   self.getSprints();
        //   console.log("inside .then")
        // });
      }
    });
    modal.present();    
  }
}
