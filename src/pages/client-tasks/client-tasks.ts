import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClientsProvider } from '../../providers/clients/clients';
import { TasksProvider } from '../../providers/tasks/tasks';

/**
 * Generated class for the ClientTasksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-client-tasks',
  templateUrl: 'client-tasks.html',
})
export class ClientTasksPage {
  public client: any;
  public clientId: any;
  public tasks: any = [];
  public clientTasks: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public tasksService: TasksProvider) {
    this.client = this.navParams.get('Client');
    console.log("hey listen!"+this.client);
    this.clientId = this.navParams.get('Id');
    this.tasks = this.client.Tasks;
    console.log(this.clientId);
    this.getTasks();
    console.log("whyyy?"+this.tasks);
    console.log("why2"+this.clientTasks);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientTasksPage');
  }


  addTask(){
    console.log("add task for client");
  }

  getTasks(){
    //this.clientTasks = [];
    var self = this;
    this.client.Tasks.forEach(task => {
      self.tasksService.getTask(task).then((doc) => {
        var temp = doc.data();
        self.clientTasks.push(doc.data());
        //console.log("tooo"+temp.Description);
      })
    });

  }
}
