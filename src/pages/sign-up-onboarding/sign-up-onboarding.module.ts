import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignUpOnboardingPage } from './sign-up-onboarding';

@NgModule({
  declarations: [
    SignUpOnboardingPage,
  ],
  imports: [
    IonicPageModule.forChild(SignUpOnboardingPage),
  ],
})
export class SignUpOnboardingPageModule {}
