import {Component} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {EVENTS_PAGE, LOGIN_PAGE} from '../pages/pages.constants';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
  template: `
    <ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>`,


})
export class MyApp {

  rootPage: string;

  constructor(public platform: Platform,
              public statusBar: StatusBar, public splashScreen: SplashScreen,
              private afAuth: AngularFireAuth) {
    // used for an example of ngFor and navigation

    this.platform.ready().then(() => {

      this.afAuth.authState
        .subscribe(auth => {
          console.log(auth);

          this.rootPage = auth ? EVENTS_PAGE : LOGIN_PAGE;

          this.splashScreen.hide()
        });

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.overlaysWebView(false);

      this.statusBar.backgroundColorByHexString('#561d71');
    });
  }

}


