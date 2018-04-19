import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TasksPage');
    this.pageTitle = this.navParams.get('Title');
    this.tasks = this.navParams.get('Tasks');
    //console.log(this.tasks[0].Description);

  }

  deleteTask(){
  console.log("delete");
  }

  moveTask(){
    console.log("move");
  }

  editTask(){
    console.log("edit");
  }

  addTask(){
    console.log("add");
  }
}
// TODO: change current sprint title to {{sprint.title or whatever}}
// add/delete/move/edit tasks
// will probs have to pass sprint id all the way through so can delete/move/add tasks
//then edit a sprint
//progress bar
//list of clients
