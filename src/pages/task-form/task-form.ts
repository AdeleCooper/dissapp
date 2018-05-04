import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the TaskFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-task-form',
  templateUrl: 'task-form.html',
})
export class TaskFormPage {
  task: any = {};
  title: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    var task = navParams.get('Task');
    if (task) {
      this.task = task;
      this.title = "Edit Task";
    } else {
      this.task.Size = "M";
      this.title = "Add Task";
    }
  }

  addTask() {
    this.viewCtrl.dismiss(this.task);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
