import { Component, ViewChild } from '@angular/core';
import {Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { AccountPage } from '../pages/account/account';
import { ReachoutPage } from '../pages/reachout/reachout';

import firebase from 'firebase';

const fbConfig = {
  apiKey: "AIzaSyBTuAmUmKhdO8xSVt8eNzW5YSP017oxG00",
  authDomain: "post-school-access-map.firebaseapp.com",
  databaseURL: "https://post-school-access-map.firebaseio.com",
  projectId: "post-school-access-map",
  storageBucket: "post-school-access-map.appspot.com",
  messagingSenderId: "464216629299"
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  rootPage:any = HomePage;
  adviceMenu: Array<{title: string, component: any, icon: string, color: string}>;
  otherMenu: Array<{title: string, component: any, icon: string, color: string}>;

  constructor(platform: Platform, menu: MenuController, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      menu.enable(true);
    });

    firebase.initializeApp(fbConfig);

    firebase.auth().getRedirectResult().then(function(result) {
      if (result.credential) {
        var token = result.credential.accessToken;
        var user = result.user;
        console.log(token, user);
      }
    }).catch(function(error) {
      // Handle Errors here.
      var errorMessage = error.message;
      console.log(errorMessage);
    });

    this.adviceMenu = [
      { title: 'Knowledgebase', component: HomePage, icon: 'school', color: 'tvet' },
      { title: 'Reachout', component: ReachoutPage, icon: 'chatboxes', color: 'he' }
    ];

    this.otherMenu = [
      { title: 'Profile', component: AccountPage, icon: 'person', color: 'isa' },
      { title: 'Share', component: HomePage, icon: 'share', color: 'primary' },
      { title: 'Settings', component: 'HomePage', icon: 'settings', color: 'dark' },
      { title: 'About', component: 'HomePage', icon: 'information-circle', color: 'isa' }
    ];

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

