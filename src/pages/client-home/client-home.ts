import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClientsProvider } from '../../providers/clients/clients';
import { TasksProvider } from '../../providers/tasks/tasks';

/**
 * Generated class for the ClientHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-client-home',
  templateUrl: 'client-home.html',
})
export class ClientHomePage {
  public clientId: any;
  public clientData: any;
  public name: any;
  public location: any;
  public taskids: any = [];
  public tasks: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public tasksService: TasksProvider, public clientsService: ClientsProvider) {
    console.log("made it"+ this.navParams.get('id'));
    this.clientId = this.navParams.get('id');
    this.getClient();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientHomePage');
  }

  getClient(){
    this.clientData = null;
    var self = this;
    this.clientsService.getClient(this.clientId).then((doc)=> {
      self.clientData = doc.data();
      console.log(self.clientData);
      self.name = self.clientData.Name;
      self.location = self.clientData.Location;
      self.taskids = self.clientData.Tasks;
      self.getTasks();
    });


  }

  getTasks(){
    var self = this;
    this.tasks = [];
    this.taskids.forEach(task => {
      self.tasksService.getTask(task).then((doc) => {
        var task = doc.data();
        self.tasks.push(task);
      })
    });
  }

  refresh(){
    this.getClient();
  }

}
