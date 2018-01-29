import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from "ionic-angular";
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";
import { AppState } from "../../models/AppState";
import Constants from "../../utils/constants";

/**
 * Generated class for the FiltersModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-filters-modal",
  templateUrl: "filters-modal.html"
})
export class FiltersModalPage {
  filters = Constants.FILTERS;

  filter$: Observable<any>;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private store: Store<AppState>
  ) {}

  ionViewDidLoad() {
    this.filter$ = this.store.select("filter");
    console.log("ionViewDidLoad FiltersModalPage");

    this.filter$.subscribe(f => {
      for (const key of Object.keys(this.filters)) {
        this.filters[key].array = f[key];
      }
    });
  }

  onClose() {
    this.viewCtrl.dismiss();
  }

  onClear() {
    for (const key of Object.keys(this.filters)) {
      this.filters[key].value = "";
    }
  }

  onFilter() {
    const filters = {};

    for (const key of Object.keys(this.filters)) {
      if (this.filters[key].value.length !== 0) {
        filters[key] = this.filters[key].value;
      }
    }

    this.viewCtrl.dismiss(filters);
  }
}
