import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ClientsProvider } from '../../providers/clients/clients';
import { PlannerHomePage } from '../planner-home/planner-home';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public clients: any;
  Name: String;

  constructor(public navCtrl: NavController, public myService: ClientsProvider) {
    this.getData();
  };
  
  getData() {
  }

  showSprintsClicked() : void
  {
     this.navCtrl.push(PlannerHomePage);
  }  
}
