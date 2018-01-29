import { Component } from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { LOGIN_PAGE, TABS_PAGE } from "../pages/pages.constants";
import { AngularFireAuth } from "angularfire2/auth";
import { FilterProvider } from "../providers/filter/filter";

@Component({
  template: `
    <ion-nav [root]="rootPage" #content swipeBackEnabled="true"></ion-nav>`
})
export class MyApp {
  rootPage: string;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private afAuth: AngularFireAuth,
    public filterProvider: FilterProvider
  ) {
    // used for an example of ngFor and navigation

    this.platform.ready().then(() => {
      this.afAuth.authState.subscribe(auth => {
        console.log("AUTH");
        console.log(auth);

        this.rootPage = auth ? TABS_PAGE : LOGIN_PAGE;

        this.hideSplashScreen();
      });

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.overlaysWebView(false);

      this.statusBar.backgroundColorByHexString("#561d71");
    });
  }

  private hideSplashScreen() {
    setTimeout(() => {
      this.splashScreen.hide();
    }, 800);
  }
}
