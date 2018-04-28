import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClientsProvider } from '../../providers/clients/clients';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public clientsService: ClientsProvider) {
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

}
