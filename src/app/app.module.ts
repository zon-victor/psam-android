import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Facebook } from '@ionic-native/facebook'

import { firebaseConfig } from '../environment/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { SwingModule } from 'angular2-swing';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TopicsProvider } from '../providers/topics/topics';
import { TemplatePage } from '../pages/template/template'
import { Section } from '../pages/template/section/section-template'
import { AuthProvider } from '../providers/auth/auth';

import { AccountPageModule } from '../pages/account/account.module';                                                                                                                                                                      
import { ReachoutPageModule } from '../pages/reachout/reachout.module';                                                                                                                                                                      

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TemplatePage,
    Section
  ],
  imports: [
    BrowserModule,
    AccountPageModule,
    ReachoutPageModule,
    HttpClientModule,
    SwingModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TemplatePage,
    Section
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TopicsProvider,
    HttpClientModule,
    AuthProvider,
    Facebook
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
