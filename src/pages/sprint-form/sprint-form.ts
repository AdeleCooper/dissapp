import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
// import { DatePicker } from '@ionic-native/date-picker';
// import { DatePickerModule } from 'ion-datepicker';

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

  ionViewDidLoad() {
    console.log('ionViewDidLoad SprintFormPage');
  }

  addSprint() {
    //var json = JSON.stringify(this.sprint);
    //console.log("json string: " + json);

    this.viewCtrl.dismiss(this.sprint);
  }

  dismiss() {
    console.log(this.sprint);
    this.viewCtrl.dismiss();
  }
}
