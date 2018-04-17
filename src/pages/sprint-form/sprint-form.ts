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
  sprint = {}
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
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
    this.viewCtrl.dismiss(this.sprint);
  }
}
