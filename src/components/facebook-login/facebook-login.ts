import {Component, EventEmitter, Output} from '@angular/core';
import {Facebook} from '@ionic-native/facebook';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/fromPromise';
import {ENV} from '@app/env';
import {FirebaseProvider} from '../../providers/firebase/firebase';
import {isEmpty} from 'lodash';

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

  @Output() onLogin = new EventEmitter<any>();
  @Output() onLoading = new EventEmitter<any>();

  didClick = false;

  constructor(private fb: Facebook, private firebaseProvider: FirebaseProvider) {
    console.log('Hello FacebookLoginComponent Component');

    if (isEmpty(firebase.app().options))
      firebase.initializeApp(ENV.firebaseConfig);
  }

  signInWithFacebook() {
    console.log('signInWithFacebook');

    if (!this.didClick) {
      this.didClick = true;

      this.onLoading.emit(true);

      this.fb.login(['public_profile', 'email'])
        .then((res: any) => {
          console.log(res);

          const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);

          return firebase.auth().signInWithCredential(facebookCredential);
        })
        .then(response => {

          return this.firebaseProvider.postNewUser(
            response.providerData[0].uid,
            {...response.providerData[0]}
          )
        })
        .then(res => {
          console.log(res);

          this.onLogin.emit(res);

          console.log('signInWithFacebook Complete!');
          this.didClick = false;
        })
        .catch(err => console.error(err))
    }

  }

}
