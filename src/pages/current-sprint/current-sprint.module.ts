import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CurrentSprintPage } from './current-sprint';

@NgModule({
  declarations: [
    CurrentSprintPage,
  ],
  imports: [
    IonicPageModule.forChild(CurrentSprintPage),
  ],
})
export class CurrentSprintPageModule {}
