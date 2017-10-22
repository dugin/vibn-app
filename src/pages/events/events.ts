import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {FirebaseProvider} from '../../providers/firebase/firebase';
import {EventModel} from '../../models/Event';
import {GeolocationProvider} from '../../providers/geolocation/geolocation';
import 'rxjs/add/operator/mergeMap';
import {toLatLng} from '../../utils/utils';
import {EVENT_DETAIL_PAGE} from '../pages.constants';
import {Observable} from 'rxjs/Observable';

/**
 * Generated class for the EventsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {

  events: EventModel[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseProvider: FirebaseProvider,
              public platform: Platform, private geolocationProvider: GeolocationProvider) {
  }

  ionViewDidLoad() {
    this.getEvents();

    console.log('ionViewDidLoad EventsPage');
  }

  getEvents() {

    this.firebaseProvider.getAllEvents()
      .map((events) =>  this.events = events)
      .mergeMap(() => this.geolocationProvider.getUsersLocation())
      .subscribe((userLocation) => {

        this.events = this.geolocationProvider.setEventsDistance
        (
          toLatLng(userLocation.coords.latitude, userLocation.coords.longitude),
          this.events
        );
      });
  }

  onEvent(event) {
    console.log(event);

    this.navCtrl.push(EVENT_DETAIL_PAGE, {event});
  }

}
