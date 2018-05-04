import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignUpPage } from '../sign-up/sign-up';

/**
 * Generated class for the SignUpOnboardingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up-onboarding',
  templateUrl: 'sign-up-onboarding.html',
})
export class SignUpOnboardingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  clientClicked(){
    var client = { Type: "Client" }
    this.navCtrl.push(SignUpPage, client);
  }

  plannerClicked(){
    var planner = { Type: "Planner" }
    this.navCtrl.push(SignUpPage, planner);
  }
}
