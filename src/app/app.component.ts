import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { PlannerHomePage } from '../pages/planner-home/planner-home';
import { SignInPage } from '../pages/sign-in/sign-in';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { SignUpOnboardingPage } from '../pages/sign-up-onboarding/sign-up-onboarding';
import { SprintsPage } from '../pages/sprints/Sprints';
import { CurrentSprintPage } from '../pages/current-sprint/current-sprint';
import { TasksPage } from '../pages/tasks/tasks';
import { ClientsPage } from '../pages/clients/clients';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = PlannerHomePage;
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Planner Home', component: PlannerHomePage },
      { title: 'Sign In', component: SignInPage },
      { title: 'Sign Up', component: SignUpPage },
      { title: 'Sign Up Onboarding', component: SignUpOnboardingPage },
      { title: 'Sprints', component: SprintsPage}
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //this.statusBar.styleDefault();
      //this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
