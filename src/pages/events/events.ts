import {Component} from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import {FirebaseProvider} from '../../providers/firebase/firebase';
import * as moment from 'moment';
import {EventModel} from '../../models/Event';
import {platform} from 'os';
import {EventDetailPage} from '../event-detail/event-detail';

import * as dateHandler from '../../utils/dateHandler';
import {GeolocationProvider} from '../../providers/geolocation/geolocation';
import 'rxjs/add/operator/mergeMap';
import {toLatLng} from '../../utils/utils';

/**
 * Generated class for the EventsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

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
      .map((events) => this.events = events)
      .mergeMap(() => this.geolocationProvider.getUsersLocation())
      .subscribe((userLocation) => {

        this.events = this.geolocationProvider.setEventsDistance(
          toLatLng(userLocation.coords.latitude, userLocation.coords.longitude),
          this.events);

      });
  }

  onEvent(event) {
    console.log(event);

    this.navCtrl.push(EventDetailPage, {event});
  }

}
