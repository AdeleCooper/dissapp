import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import firebase from 'firebase';
import 'firebase/firestore';
import { SprintsProvider} from '../../providers/sprints/sprints';

/**
 * Generated class for the SprintsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sprints',
  templateUrl: 'sprints.html',
})
export class SprintsPage {
  public currentSprint: any;
  public inactiveSprints: any = [];
  public sprintIds: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public myService: SprintsProvider) {
    this.getSprints();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SprintsPage');
  }

  fixupDate(date) {
    var d = new Date(date);
    return d.toLocaleDateString("en-GB");
  }

  getSprints() {
    // TODO: The collection id can be supplied as a param to this function when the login page switches to this page
    this.inactiveSprints = [];
    this.currentSprint = null;
    var self = this;

    this.myService.getSprintCollection('9uovgQw0zVKFdMyMJXNz').then((doc) =>
    {
      if (doc) {
        //var x = doc.data();
        self.sprintIds = doc.data().Sprints;

        self.sprintIds.forEach( id => {
          self.myService.getSprint(id).then((doc) =>
          {
            var sprint = doc.data();
            //var date = new Date(sprint.StartDate);
            sprint.StartDate = self.fixupDate(sprint.StartDate);//date.toLocaleDateString("en-GB");
            sprint.EndDate = self.fixupDate(sprint.EndDate);//date.toLocaleDateString("en-GB");

            if (sprint.Active) {
              self.currentSprint = sprint;
            } else {
              self.inactiveSprints.push(sprint);
            }
          });
        });
      }
    })
    .catch((error: any) =>
    {
      console.error("getSprints - error received: " + error);
    });
  }
}
