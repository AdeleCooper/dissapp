import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams, Events } from 'ionic-angular';
import { ClientsProvider } from '../../providers/clients/clients';
import { PlannersProvider } from '../../providers/planners/planners';
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
  public newClientId: any;
  public plannerId: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,
    public tasksService: TasksProvider, public clientsService: ClientsProvider, public plannersService: PlannersProvider, public events: Events) {
    this.clientIds = this.navParams.get('Clients');
    this.plannerId = this.navParams.get('PlannerId');
    var self = this;
    this.populateClientsArray();
  }

  clientClicked(client,i) {
    var data = { 
      Client: client,
      Id: this.clientIds[i]
    };
    this.navCtrl.push(ClientTasksPage, data);
  }

  addClient(){
    this.clientIds.push(this.newClientId);
    var self = this;
    var data = {
      Clients: this.clientIds
    }
    this.plannersService.updatePlanner(this.plannerId, data).then((doc) => {
      self.populateClientsArray();
      self.events.publish('clients:changed', { clients: self.clientIds});
    })
  }

  populateClientsArray(){
    this.clientsData = [];
    var self = this;
    this.clientIds.forEach(element => {
      this.clientsService.getClient(element).then((doc) => {
        var client= doc.data();
        self.clientsData.push(client);
      });
    });
  }
}
