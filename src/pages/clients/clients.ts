import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams } from 'ionic-angular';
import { ClientsProvider } from '../../providers/clients/clients';
import { ClientTasksPage } from '../client-tasks/client-tasks';
import { TaskFormPage } from '../task-form/task-form';
import { TasksProvider } from '../../providers/tasks/tasks';

/**
 * Generated class for the ClientsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-clients',
  templateUrl: 'clients.html',
})
export class ClientsPage {
  public clientIds: any = [];
  public clientsData: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,
    public tasksService: TasksProvider, public clientsService: ClientsProvider) {
    this.clientIds = this.navParams.get('Clients');
    var self = this;

    this.clientIds.forEach(element => {
      console.log('client id: ' + element);
      this.clientsService.getClient(element).then((doc) => {
        var client= doc.data();
        self.clientsData.push(client);
      });
      
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientsPage');
  }

  clientClicked(client,i){
    var data = { 
      Client: client,
      Id: this.clientIds[i]
    };
    this.navCtrl.push(ClientTasksPage, data);

  }

  addClient(){
    console.log("add client");
  }

}
