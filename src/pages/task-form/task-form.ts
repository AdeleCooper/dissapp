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
  task = {};
  title: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    var task = navParams.get('Task');
    if (task) {
      this.task = task;
      this.title = "Edit Task";
      console.info('task id: '+ task.id);
    } else {
      this.title = "Add Task";
    }
    console.info('task: '+ task);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskFormPage');
  }

  addTask() {
    this.viewCtrl.dismiss(this.task);
  }
  
  dismiss() {
    console.log(this.task);
    this.viewCtrl.dismiss();
  }  
}
