import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PlannerHomePage } from '../pages/planner-home/planner-home';
import { SignInPage } from '../pages/sign-in/sign-in';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { SignUpOnboardingPage } from '../pages/sign-up-onboarding/sign-up-onboarding';
import { SprintsPage } from '../pages/sprints/Sprints';
import { SprintFormPage } from '../pages/sprint-form/sprint-form';
import { CurrentSprintPage } from '../pages/current-sprint/current-sprint';
import { TasksPage } from '../pages/tasks/tasks';
import { TaskFormPage } from '../pages/task-form/task-form';
import { ClientsPage } from '../pages/clients/clients';
import { ClientTasksPage } from '../pages/client-tasks/client-tasks';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { DatePickerModule } from 'ion-datepicker';

import firebase from "firebase";
import { ClientsProvider } from '../providers/clients/clients';
import { SprintsProvider } from '../providers/sprints/sprints';
import { TasksProvider } from '../providers/tasks/tasks';
import { PlannersProvider } from '../providers/planners/planners';
import { SprintCollectionsProvider } from '../providers/sprint-collections/sprint-collections';
import { UsersProvider } from '../providers/users/users';
//import { credentials } from './config';

var credentials = {
      apiKey: "AIzaSyA4d7whowjrUKOI_x42XpPlczsVhjr7Rio",
      authDomain: "dissertation-84cc9.firebaseapp.com",
      databaseURL: "https://dissertation-84cc9.firebaseio.com",
      projectId: "dissertation-84cc9",
      storageBucket: "dissertation-84cc9.appspot.com",
      messagingSenderId: "503275249879"
}  

firebase.initializeApp(credentials);

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PlannerHomePage,
    SignInPage,
    SignUpPage,
    SignUpOnboardingPage,
    SprintsPage,
    SprintFormPage,
    CurrentSprintPage,
    TasksPage,
    TaskFormPage,
    ClientsPage,
    ClientTasksPage ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(credentials),
    //firebase.initializeApp(credentials),
    AngularFireModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    DatePickerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PlannerHomePage,
    SignInPage,
    SignUpPage,
    SignUpOnboardingPage,
    SprintsPage,
    SprintFormPage,
    CurrentSprintPage,
    TasksPage,
    TaskFormPage,
    ClientsPage,
    ClientTasksPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ClientsProvider,
    SprintsProvider,
    TasksProvider,
    PlannersProvider,
    SprintCollectionsProvider,
    TasksProvider,
    UsersProvider
  ]
})
export class AppModule {}
