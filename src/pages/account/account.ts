import { Component } from '@angular/core';
import {
  IonicPage, 
  Loading,
  LoadingController, 
  NavController,
  AlertController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { AuthProvider } from '../../providers/auth/auth';
import * as firebase from 'firebase/app';

@IonicPage({
  name: 'account'
})

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})

export class AccountPage {

  public userProfile:any = null; 
  public uid: string;
  public name: string;
  public photoUrl: string;
  public email: string;
  public cell: string;
  public emailVerified: boolean;

  public signupForm: FormGroup;  
  public loginForm: FormGroup;
  public resetForm: FormGroup;
  public loading: Loading;
  showLoginForm: boolean = false;
  showSignupForm: boolean = false;
  showResetForm: boolean = false;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController, 
    public authProvider: AuthProvider, 
    public formBuilder: FormBuilder
  ) {

        firebase.auth().onAuthStateChanged( user => {
          if (user) {
            this.userProfile = user;
            this.uid = user.uid;
            this.name = user.displayName;
            this.email = user.email;
            this.cell = user.phoneNumber;
            this.emailVerified = user.emailVerified;
          }
        });

      this.loginForm = formBuilder.group({
        email: ['', 
        Validators.compose([Validators.required, EmailValidator.isValid])],
        password: ['', 
        Validators.compose([Validators.minLength(6), Validators.required])]
      });

      this.signupForm = formBuilder.group({
        email: ['', 
          Validators.compose([Validators.required, EmailValidator.isValid])],
        password: ['', 
          Validators.compose([Validators.minLength(6), Validators.required])],
        name: ['', 
          Validators.compose([Validators.minLength(2), Validators.required])]
      });

      this.resetForm = formBuilder.group({
        email: ['', 
        Validators.compose([Validators.required, EmailValidator.isValid])],
      });
  }

  toggleSignupForm () {
    if (this.showSignupForm) {
     this.showSignupForm = false
    }
    else {
      this.showSignupForm = true
    }
  }

  toggleLoginForm () {
    if (this.showLoginForm) {
     this.showLoginForm = false
    }
    else {
      this.showLoginForm = true
    }
  }

  toggleResetForm () {
    if (this.showResetForm) {
     this.showResetForm = false
    }
    else {
      this.showResetForm = true
    }
  }

  loginUser(): void {
    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
      this.authProvider.loginWithBridge(this.loginForm.value.email, 
          this.loginForm.value.password)
      .then( authData => {
        this.loading.dismiss().then( () => {
          this.navCtrl.setRoot(AccountPage);
        });
      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }

  logoutUser(): void {
    this.authProvider.logoutUser();
    this.navCtrl.push('account');
  }

  googleLogin(): void {
      this.authProvider.loginWithGoogle()
      .then( authData => {
        this.loading.dismiss().then( () => {
          this.navCtrl.setRoot(AccountPage);
        });
      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });
      this.loading = this.loadingCtrl.create();
      this.loading.present();
  }

  facebookLogin(): void {
      this.authProvider.loginWithFacebook()
      .then( authData => {
        this.loading.dismiss().then( () => {
          this.navCtrl.setRoot(AccountPage);
        });
      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });
      this.loading = this.loadingCtrl.create();
      this.loading.present();
  }

  signupUser(){
    if (!this.signupForm.valid){
      console.log(this.signupForm.value);
    } else {
      this.authProvider.signupForBridgeAccount(this.signupForm.value.name, this.signupForm.value.email, 
          this.signupForm.value.password)
      .then(() => {
        this.loading.dismiss().then( () => {
          this.navCtrl.setRoot(AccountPage);
        });
      }, (error) => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }

  resetUser(){
    if (!this.resetForm.valid){
      this.navCtrl.setRoot(AccountPage);
    } else {
      this.authProvider.resetBridgePassword(this.resetForm.value.email)
      .then((user) => {
        let alert = this.alertCtrl.create({
          message: "We sent a reset link to your email",
          buttons: [
            {
              text: "Ok",
              role: 'cancel',
              handler: () => { 
                this.navCtrl.setRoot(AccountPage);
              }
            }
          ]
        });
        alert.present()
  
      }, (error) => {
        var errorMessage: string = error.message;
        let errorAlert = this.alertCtrl.create({
          message: errorMessage,
          buttons: [{ text: "Ok", role: 'cancel' }]
        });
        errorAlert.present();
      });
    }
  }

}
