import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TasksProvider } from '../../providers/tasks/tasks';
import { TasksPage } from '../tasks/tasks';

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


  constructor(public navCtrl: NavController, public navParams: NavParams, public tasksService: TasksProvider) {
    this.taskIds = this.navParams.get('Tasks');
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
    this.getTasks();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CurrentSprintPage');



    
    console.log(this.currentSprint);
  }

  getTasks() {
    var self = this;
    this.otherTasks = [];
    this.completedTasks = [];
    this.taskIds.forEach(task => {
      self.tasksService.getTask(task).then((doc) => {
        var taskData = doc.data();
        taskData.id = task;
        if (taskData.Progress == "Complete") {
          self.completedTasks.push(taskData);

        }else {
          self.otherTasks.push(taskData);
        }
        
      })
    });
  }

  viewCompletedTasks(){
    var data = {
      Title: "Completed Tasks",
      Tasks: this.completedTasks
    }
    this.navCtrl.push(TasksPage, data);
  }

  viewTasks(){
    var data = {
      Title: "Outstanding Tasks",
      Tasks: this.otherTasks,
      SprintId: this.sprintid
    }
    this.navCtrl.push(TasksPage, data);
  }
}
