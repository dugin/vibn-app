import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from "ionic-angular";
import { FirebaseProvider } from "../../providers/firebase/firebase";
import { FilterProvider } from "../../providers/filter/filter";

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
  filters;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private filterProvider: FilterProvider
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad FiltersModalPage");

    this.filterProvider.filter$.subscribe(f => {
      for (const key of Object.keys(this.filterProvider.filters)) {
        this.filterProvider.filters[key].array = f[key];
      }
      this.filters = this.filterProvider.filters;
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

    this.filterProvider.filters = this.filters;
    this.viewCtrl.dismiss(filters);
  }
}
