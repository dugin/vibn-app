import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {LOGIN_PAGE} from '../pages/pages.constants';

@Component({
  template: `
    <ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>`,

})
export class MyApp {

  rootPage: string = LOGIN_PAGE;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    // used for an example of ngFor and navigation

    this.platform.ready().then(() => {

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

}


