import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams } from 'ionic-angular';
import { ClientsProvider } from '../../providers/clients/clients';
import { TasksProvider } from '../../providers/tasks/tasks';
import { TaskFormPage } from '../task-form/task-form';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController,
    public clientsService: ClientsProvider, public tasksService: TasksProvider) {
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


  addTask() {
    console.log("addTask clicked");
    var self = this;
    let modal = this.modalCtrl.create(TaskFormPage);

    modal.onDidDismiss(data => {
        if (!data) {
          console.info('task add cancelled');
          return;
        }

        self.tasksService.addClientTask(data).then((doc) => {
          console.log("inside .then");
          data.id = doc.id;
          self.tasks.push(doc.id);
          self.tasksService.editTask(data);
          self.clientTasks.push(data);
          self.clientsService.updateClient(self.clientId, {Tasks: self.tasks});
        });
    });
    modal.present();

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
