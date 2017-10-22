import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {EVENTS_PAGE} from '../pages.constants';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loading = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

  }

  onLoading() {
    this.loading = true;
  }

  onLogin(res) {

    this.onSkip();
  }

  onSkip() {
    this.navCtrl.setRoot(EVENTS_PAGE, {}, {animate: true, direction: 'forward'});
  }

}
