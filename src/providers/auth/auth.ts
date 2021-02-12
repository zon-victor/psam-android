import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Facebook } from '@ionic-native/facebook';

@Injectable()
export class AuthProvider {

  public userProfile:any = null;

  constructor(private facebook: Facebook) {
    firebase.auth().onAuthStateChanged( user => {
      if (user) {
        this.userProfile = user;
      }
    });
  }
  
    loginWithBridge(email: string, password: string): Promise<any> {
      return firebase.auth().signInWithEmailAndPassword(email, password);
    }

    signupForBridgeAccount(name: string, email: string, password: string): Promise<any> {
      return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
        .then( newUser => {
            firebase
        .database()
        .ref('/userProfile')
        .child(newUser.uid)
            .set({ email: email, name: name });
      });
    }

    resetBridgePassword(email: string): Promise<void> {
      return firebase.auth().sendPasswordResetEmail(email);
    }

    logoutUser(): Promise<void> {
      return firebase.auth().signOut();
    }

    loginWithGoogle(): Promise<any> {
      const provider = new firebase.auth.GoogleAuthProvider();
    
      return firebase.auth().signInWithRedirect(provider).then( () => {
        firebase.auth().getRedirectResult().then( result => {
          this.userProfile = result.user;
        }).catch(function(error) {
          console.log(error.message);
        });
      });
    }

    loginWithFacebook(){
      return this.facebook.login(['email']).then( (response) => {
          const facebookCredential = firebase.auth.FacebookAuthProvider
              .credential(response.authResponse.accessToken);
  
          firebase.auth().signInWithCredential(facebookCredential)
          .then((success) => {
              this.userProfile = success;
          })
          .catch((error) => {
              console.log("Firebase failure: " + JSON.stringify(error));
          });
  
      }).catch((error) => { console.log(error) });
  }

}
