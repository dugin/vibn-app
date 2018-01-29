import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { EVENTS_PAGE, MAPS_PAGE } from "../pages.constants";
import { Store } from "@ngrx/store";
import { AppState } from "../../models/AppState";
import { Observable } from "rxjs/Observable";

/**
 * Generated class for the TabsPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-tabs",
  templateUrl: "tabs.html"
})
export class TabsPage {
  listRoot = EVENTS_PAGE;
  mapsRoot = MAPS_PAGE;

  shouldEnableMaps = false;

  events$: Observable<any>;

  constructor(public navCtrl: NavController, private store: Store<AppState>) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad TabsPage");

    this.events$ = this.store.select("events");

    this.events$.subscribe(e => {
      this.shouldEnableMaps = !e.loading;
    });
  }
}
