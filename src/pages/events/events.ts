import {Component} from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import {FirebaseProvider} from '../../providers/firebase/firebase';
import * as moment from 'moment';
import {EventModel} from '../../models/Event';
import {platform} from 'os';
import {EventDetailPage} from '../event-detail/event-detail';

import * as dateHandler from '../../utils/dateHandler';

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
              public platform: Platform) {
  }

  ionViewDidLoad() {
    this.getEvents();

    console.log('ionViewDidLoad EventsPage');
  }

  getEvents() {
    this.firebaseProvider.getAllEvents()
      .subscribe((val: EventModel[]) => {
        console.log(val);
        this.events = dateHandler.sortByDate(val);
      });
  }

  setPadding() {
    return this.platform.is('android') ? 56 : 44;
  }


  onEvent(event) {
    console.log(event);

    this.navCtrl.push(EventDetailPage, {event});
  }

}
