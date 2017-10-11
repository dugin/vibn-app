import {Component} from '@angular/core';
import {FirebaseProvider} from '../../providers/firebase/firebase';
import {Facebook} from '@ionic-native/facebook';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';

/**
 * Generated class for the FacebookLoginComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'facebook-login',
  templateUrl: 'facebook-login.html'
})
export class FacebookLoginComponent {

  text: string;

  constructor(private fb: Facebook) {
    console.log('Hello FacebookLoginComponent Component');
    this.text = 'Hello World';
  }


  signInWithFacebook() {
    return this.fb.login(['email', 'public_profile']).then(res => {
      const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
      return firebase.auth().signInWithCredential(facebookCredential);
    })

  }

}
