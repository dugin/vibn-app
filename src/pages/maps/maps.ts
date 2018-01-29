import { Component } from "@angular/core";
import {
  IonicPage,
  ModalController,
  NavController,
  NavParams
} from "ionic-angular";
import {
  GoogleMap,
  GoogleMaps,
  GoogleMapsEvent,
  HtmlInfoWindow
} from "@ionic-native/google-maps";
import { setEventDate, setTime } from "../../utils/dateHandler";
import { EVENT_DETAIL_PAGE, FILTERS_MODAL_PAGE } from "../pages.constants";
import { EventModel } from "../../models/Event";
import { Observable } from "rxjs/Observable";
import * as eventsActions from "../../actions/events.action";
import * as filtersActions from "../../actions/filter.action";
import { Store } from "@ngrx/store";
import { AppState } from "../../models/AppState";

/**
 * Generated class for the MapsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-maps",
  templateUrl: "maps.html"
})
export class MapsPage {
  events: EventModel[];
  map: GoogleMap;

  events$: Observable<any>;
  user$: Observable<any>;
  filter$: Observable<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private store: Store<AppState>
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad MapsPage");

    this.events$ = this.store.select("events");
    this.user$ = this.store.select("user");
    this.filter$ = this.store.select("filter");

    this.setEvents();
  }

  setEvents() {
    this.events$.subscribe(resp => {
      console.log("events on map");
      console.log(resp);

      if (resp.filteredEvents) {
        this.events = resp.filteredEvents;
        this.resetMarkers();
      } else {
        this.events = resp.events;
        this.loadMap(this.events);
      }
    });
  }

  resetMarkers() {
    this.map.clear().then(() =>
      setTimeout(() => {
        this.map.moveCamera({
          target: {
            lat: this.events[0].coordinates._lat,
            lng: this.events[0].coordinates._long
          },
          duration: 1000
        });
        this.setMarkers(this.events);
      }, 500)
    );
  }

  loadMap(events) {
    this.map = GoogleMaps.create("map_canvas", this.setMapOptions(events));

    this.map.setMyLocationEnabled(true);
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      this.setMarkers(events);
    });
  }

  setMapOptions(events) {
    if (events && events.length > 0) {
      return {
        camera: {
          target: {
            lat: events[0].coordinates._lat,
            lng: events[0].coordinates._long
          },
          zoom: 14
        }
      };
    }
    return {
      camera: {
        target: {
          lat: -22.983748,
          lng: -43.206229
        },
        zoom: 11
      }
    };
  }

  setMarkers(events) {
    // Wait the MAP_READY before using any methods.

    console.log(events);
    events.forEach(e => {
      this.map
        .addMarker({
          icon: "rebeccapurple",
          animation: "DROP",
          position: this.getRandomCoord(
            e.coordinates._lat,
            e.coordinates._long,
            events
          )
        })
        .then(marker => {
          marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
            console.log("MARKER_CLICK");

            const htmlInfoWindow = new HtmlInfoWindow();

            const infoWindow = this.markerInfoWindow(e);

            htmlInfoWindow.setBackgroundColor("#3f3f3f");
            htmlInfoWindow.setContent(infoWindow);
            htmlInfoWindow.open(marker);

            infoWindow.addEventListener("click", () => {
              this.onEvent(e);
            });
          });
        });
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
      this.store.dispatch(new eventsActions.FilterEvents(data));
      this.store.dispatch(new filtersActions.SetFilters(data));
    });
  }

  markerInfoWindow(event) {
    const div = document.createElement("div");
    div.style.cssText =
      "display:flex;flex: 1;flex-direction:column;height:inherit;padding:10px";

    div.innerHTML = `
              <p style="font-size: 14px; margin: 0 0 10px 0 ;  color: white">
                    ${event.title}
              </p>
              <div style="display: flex; justify-content: space-between; align-items: center; color: lightgray; font-size: 12px">
                    <span>
                          ${setEventDate(event.startDate)}  -  
                          ${setTime(event.startDate)}h
                    </span>
                    <a style="color: #96c77f; font-size: 18px; text-decoration: underline; font-weight: 300"> Detalhes</a> 
              </div>`;

    return div;
  }

  getRandomCoord(lat, lng, events) {
    const occur = this.findOccurrences(lat, lng, events);

    if (occur > 1) {
      return {
        lat: lat + (Math.floor(Math.random() * 1000) + 100) / 1000000,
        lng: lng + (Math.floor(Math.random() * 1000) + 100) / 1000000
      };
    }

    return { lat, lng };
  }

  findOccurrences(lat, lng, events) {
    return events.filter(
      e => e.coordinates._lat === lat && e.coordinates._long === lng
    ).length;
  }
}
