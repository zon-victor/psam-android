import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase/app';
import { ISubscription } from 'rxjs/Subscription';

import { AccountPage } from '../account/account';
/**
 * Generated class for the ReachoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reachout',
  templateUrl: 'reachout.html',
})
export class ReachoutPage {
  FORUM = firebase.database().ref("FORUM/Messages");

  public user: any = null;
  public uid: string;
  public name: string;
  public photoUrl: string;
  public email: string;
  public cell: string;
  public emailVerified: boolean;

  public addMessage: boolean = false;
  myMessage: string;
  public messages: any = [];
  public _this = this;

  constructor(public authProvider: AuthProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.user = this.authProvider.userProfile;
    if (this.user) {
      this.uid = this.user.uid;
      this.name = this.user.displayName;
      this.email = this.user.email;
      this.cell = this.user.phoneNumber;
      this.emailVerified = this.user.emailVerified;

      var _t = this;

      this.FORUM.on('value', function(snapshot) {
        var arr = snapshot.val();
        for (var key in arr)
        {
         _t.messages.push(arr[key]);
        }
      });
      
    } else {
      this.navCtrl.setRoot(AccountPage);
    }
  }

  ngOnInit() {

  }

  toggleMessageForm() {
    this.myMessage = ""
    if (this.addMessage) {
      this.addMessage = false
    }
    else {
      this.addMessage = true
    }
  }

  _tt = this;
  postMessage() {
    var message = this.myMessage;
    console.log("Message: ", message)
    if (message && message.trim().length) {
      this.FORUM.push({ message: message, user: this.name});
      this.toggleMessageForm();
    }
  }

}
