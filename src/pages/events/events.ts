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
      .map(events => {
        this.filterProvider.events.next(events);

        return (this.events = events);
      })
      .mergeMap(() => this.geolocationProvider.getUsersLocation())
      .map(userLocation => {
        const latLng = toLatLng(
          userLocation.coords.latitude,
          userLocation.coords.longitude
        );
        this.filterProvider.userLocation.next(latLng);
        this.filterProvider.userLocation.complete();

        return latLng;
      })
      .subscribe(userLocation => {
        this.events = this.geolocationProvider.setEventsDistance(
          userLocation,
          this.events
        );

        this.filterProvider.events.next(this.events);
        this.filterProvider.events.complete();
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
      this.filterProvider
        .onFilter(data)
        .subscribe(events => (this.events = events));

      // this.filterProvider.events.subscribe(events => {
      //   if (!isEmpty(data)) {
      //     this.events = events.filter(e => {
      //       for (const key of Object.keys(e.tags)) {
      //         let tags = data[key];
      //
      //         shouldShow = !tags || e.tags[key].some(t => tags.includes(t));
      //
      //         if (!shouldShow) break;
      //       }
      //
      //       return shouldShow;
      //     });
      //   } else if (typeof data !== "undefined") {
      //     this.events = events;
      //   }
      //
      //   this.filterProvider.filteredEvents = this.events;
      // });
    });
  }
}
