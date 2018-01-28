import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { EVENTS_PAGE, MAPS_PAGE } from "../pages.constants";
import { FilterProvider } from "../../providers/filter/filter";

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

  constructor(
    public navCtrl: NavController,
    public filterProvider: FilterProvider
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad TabsPage");

    this.filterProvider.events.subscribe(e => {
      this.shouldEnableMaps = true;
    });
  }
}
