import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the SprintFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sprint-form',
  templateUrl: 'sprint-form.html',
})
export class SprintFormPage {
  sprint = {
    Tasks: []
  }
  title: any;
  creating: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    var sprintToEdit = navParams.get('Sprint');
    if (sprintToEdit) {
      this.sprint = sprintToEdit;
      this.title = "Edit Sprint";
      this.creating = false;
    } else {
      this.title = "Add Sprint";
      this.creating = true;
    }
  }

  addSprint() {
    this.viewCtrl.dismiss(this.sprint);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
