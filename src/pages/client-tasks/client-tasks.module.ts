import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientTasksPage } from './client-tasks';

@NgModule({
  declarations: [
    ClientTasksPage,
  ],
  imports: [
    IonicPageModule.forChild(ClientTasksPage),
  ],
})
export class ClientTasksPageModule {}
