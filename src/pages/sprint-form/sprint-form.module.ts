import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SprintFormPage } from './sprint-form';

@NgModule({
  declarations: [
    SprintFormPage,
  ],
  imports: [
    IonicPageModule.forChild(SprintFormPage),
  ],
})
export class SprintFormPageModule {}
