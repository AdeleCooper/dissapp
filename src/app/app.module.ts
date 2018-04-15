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

//import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import firebase from "firebase";
import { ClientsProvider } from '../providers/clients/clients';
import { SprintsProvider } from '../providers/sprints/sprints';
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
    SprintsPage ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    //AngularFireModule.initializeApp(credentials.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PlannerHomePage,
    SignInPage,
    SignUpPage,
    SignUpOnboardingPage,
    SprintsPage    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ClientsProvider,
    SprintsProvider
  ]
})
export class AppModule {}
