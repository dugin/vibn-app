import {Component, NgZone} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams, Platform} from 'ionic-angular';
import {EventModel} from '../../models/Event';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {COUPON_MODAL_PAGE} from '../pages.constants';

/**
 * Generated class for the EventDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {

  event: EventModel;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public platform: Platform, private iab: InAppBrowser,
              public modalCtrl: ModalController,
              private zone: NgZone) {
  }

  ionViewDidLoad() {

    console.log(this.navParams.get('event'))
    this.event = this.navParams.get('event');
    console.log('ionViewDidLoad EventDetailPage');


  }

  onWantIt() {

    console.log(this.event.coupon)

    if (this.event.directLink || !this.event.coupon)
      this.iab.create(this.event.buyLink);

    else {
        const couponModal = this.modalCtrl.create(COUPON_MODAL_PAGE, {event: this.event});
        couponModal.present();

    }

  }


}
