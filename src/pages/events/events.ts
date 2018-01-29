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
import { EVENT_DETAIL_PAGE, FILTERS_MODAL_PAGE } from "../pages.constants";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import * as eventsActions from "../../actions/events.action";
import * as userActions from "../../actions/user.action";
import * as filtersActions from "../../actions/filter.action";
import { AppState } from "../../models/AppState";
import Constants from "../../utils/constants";

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

  events$: Observable<any>;
  user$: Observable<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseProvider: FirebaseProvider,
    public platform: Platform,
    public modalCtrl: ModalController,
    private store: Store<AppState>,
    private geolocationProvider: GeolocationProvider
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad EventsPage");

    this.events$ = this.store.select("events");
    this.user$ = this.store.select("user");

    this.fetchFilters();
    this.fetchEvents();
  }

  fetchEvents() {
    this.store.dispatch(new eventsActions.GetEvents());
    this.store.dispatch(new userActions.SetGeolocation());

    let eventState: any = {};

    this.events$
      .map(resp => {
        eventState = resp;
        this.events = resp.filteredEvents ? resp.filteredEvents : resp.events;
      })
      .mergeMap(() => this.user$)
      .subscribe(resp => {
        this.setDistanceFromUser(
          eventState.isFirstFetch,
          resp.user.coordinates
        );
      });
  }

  setDistanceFromUser(isFirstFetch, coordinates) {
    if (coordinates && isFirstFetch && this.events) {
      this.events = this.geolocationProvider.setEventsDistance(
        coordinates,
        this.events
      );
      this.store.dispatch(new eventsActions.UpdateEvents(this.events));
    }
  }

  onEvent(event) {
    console.log(event);

    this.navCtrl.push(EVENT_DETAIL_PAGE, { event });
  }

  onFilter() {
    const filterModal = this.modalCtrl.create(FILTERS_MODAL_PAGE);
    filterModal.present();

    filterModal.onDidDismiss(data => {
      this.store.dispatch(new eventsActions.FilterEvents(data));
      this.store.dispatch(new filtersActions.SetFilters(data));
    });
  }

  fetchFilters() {
    for (const key of Object.keys(Constants.FILTERS)) {
      this.store.dispatch(new filtersActions.GetFilters(key));
    }
  }
}
