import { Component } from "@angular/core";
import {
  IonicPage,
  ModalController,
  NavController,
  NavParams,
  Platform
} from "ionic-angular";
import { FirebaseProvider } from "../../providers/firebase/firebase";
import { EventModel } from "../../models/Event";
import { GeolocationProvider } from "../../providers/geolocation/geolocation";
import "rxjs/add/operator/mergeMap";
import { toLatLng } from "../../utils/utils";
import { EVENT_DETAIL_PAGE, FILTERS_MODAL_PAGE } from "../pages.constants";
import isEmpty from "lodash/isEmpty";
import { FilterProvider } from "../../providers/filter/filter";

/**
 * Generated class for the EventsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-events",
  templateUrl: "events.html"
})
export class EventsPage {
  events: EventModel[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseProvider: FirebaseProvider,
    public platform: Platform,
    public geolocationProvider: GeolocationProvider,
    public modalCtrl: ModalController,
    public filterProvider: FilterProvider
  ) {}

  ionViewDidLoad() {
    this.getEvents();

    console.log("ionViewDidLoad EventsPage");
  }

  getEvents() {
    this.firebaseProvider
      .getAllEvents()
      .map(events => (this.events = this.filterProvider.events = events))
      .mergeMap(() => this.geolocationProvider.getUsersLocation())
      .subscribe(userLocation => {
        this.events = this.filterProvider.events = this.geolocationProvider.setEventsDistance(
          toLatLng(userLocation.coords.latitude, userLocation.coords.longitude),
          this.events
        );
      });
  }

  onEvent(event) {
    console.log(event);

    this.navCtrl.push(EVENT_DETAIL_PAGE, { event });
  }

  onFilter() {
    const filterModal = this.modalCtrl.create(FILTERS_MODAL_PAGE);
    filterModal.present();

    filterModal.onDidDismiss(data => {
      if (!isEmpty(data)) {
        let shouldShow = true;

        this.events = this.filterProvider.events.filter(e => {
          for (const key of Object.keys(e.tags)) {
            let tags = data[key];

            shouldShow = !tags || e.tags[key].some(t => tags.includes(t));

            if (!shouldShow) break;
          }

          return shouldShow;
        });
      } else if (typeof data !== "undefined") {
        this.events = this.filterProvider.events;
      }
    });
  }
}
