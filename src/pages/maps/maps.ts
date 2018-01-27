import { Component } from "@angular/core";
import {
  IonicPage,
  ModalController,
  NavController,
  NavParams
} from "ionic-angular";
import { FilterProvider } from "../../providers/filter/filter";
import {
  GoogleMap,
  GoogleMapOptions,
  GoogleMaps,
  GoogleMapsEvent,
  HtmlInfoWindow
} from "@ionic-native/google-maps";
import { setEventDate, setTime } from "../../utils/dateHandler";
import { EVENT_DETAIL_PAGE, FILTERS_MODAL_PAGE } from "../pages.constants";
import { EventModel } from "../../models/Event";
import isEqual from "lodash/isEqual";

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
  coordinates;
  events: EventModel[];
  map: GoogleMap;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public filterProvider: FilterProvider,
    public modalCtrl: ModalController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad MapsPage");

    this.filterProvider.events
      .mergeMap(e => {
        this.events = e;

        return this.filterProvider.userLocation;
      })
      .subscribe(c => {
        this.coordinates = c;
        this.loadMap(this.events);
      });
  }

  ionViewWillEnter() {
    console.log("ionViewWillEnter");
    console.log(this.filterProvider.filteredEvents);

    if (
      this.filterProvider.filteredEvents &&
      !isEqual(this.filterProvider.filteredEvents, this.events)
    ) {
      this.events = this.filterProvider.filteredEvents;

      this.resetMarkers();
    }
  }

  resetMarkers() {
    this.map
      .clear()
      .then(() => setTimeout(() => this.setMarkers(this.events), 1000));
  }

  loadMap(events) {
    const mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: this.coordinates.latitude,
          lng: this.coordinates.longitude
        },
        zoom: 15
      }
    };

    this.map = GoogleMaps.create("map_canvas", mapOptions);

    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      this.setMarkers(events);
    });
  }

  setMarkers(events) {
    // Wait the MAP_READY before using any methods.

    console.log(events);
    events.forEach(e => {
      this.map
        .addMarker({
          icon: "purple",
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
      this.filterProvider.onFilter(data).subscribe(events => {
        this.events = events;
        this.resetMarkers();
      });
    });
  }

  private markerInfoWindow(event) {
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
                    <a style="color: #96c77f; font-size: 20px; text-decoration: underline; font-weight: 300"> Detalhes</a> 
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
