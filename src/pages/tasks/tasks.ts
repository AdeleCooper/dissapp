import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TasksProvider } from '../../providers/tasks/tasks';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public tasksService: TasksProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TasksPage');
    this.pageTitle = this.navParams.get('Title');
    this.tasks = this.navParams.get('Tasks');
    this.addTask();
    //console.log(this.tasks[0].Description);

  }

  deleteTask(){
  console.log("delete");
  //this.tasksService.deleteTask();
  }

  moveTask(){
    console.log("move");
  }

  editTask(task){
    console.log("edit");
    var data = {
      Description: "test"
    }
    console.log(task.id);
    //this.tasksService.editTask(task.id, data);
  }

  addTask(){
    console.log("add");
    var data = {
      name: "task test"
    }
    //return updated list of tasks and repopulate so that page updates 
    this.tasksService.addTask(data, "SoOvvBrscRTc7EFaulsn", this.tasks);
  }
}
// add/delete/move/edit tasks
// will probs have to pass sprint id all the way through so can delete/move/add tasks
//then edit a sprint
//progress bar
//list of clients
