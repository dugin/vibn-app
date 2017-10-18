import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {EventModel} from '../../models/Event';

/**
 * Generated class for the EventDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {

  event: EventModel;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public platform: Platform) {
  }

  ionViewDidLoad() {

   console.log(this.navParams.get('event'))
    this.event = this.navParams.get('event');
    console.log('ionViewDidLoad EventDetailPage');
  }


}
