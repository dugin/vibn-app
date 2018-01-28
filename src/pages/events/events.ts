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
import { Firebase } from "@ionic-native/firebase";
import "rxjs/add/operator/catch";
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
    public filterProvider: FilterProvider,
    private firebase: Firebase
  ) {}

  ionViewDidLoad() {
    this.firebase.grantPermission().then(resp => {
      console.log(resp);
    });

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
      .subscribe(
        userLocation => {
          this.events = this.geolocationProvider.setEventsDistance(
            userLocation,
            this.events
          );

          this.filterProvider.events.next(this.events);
          this.filterProvider.events.complete();
        },
        err => {
          console.log(err);
          this.filterProvider.events.complete();
          this.filterProvider.userLocation.next(null);
          this.filterProvider.userLocation.complete();
        }
      );
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
    });
  }
}
