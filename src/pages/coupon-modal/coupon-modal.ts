import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from "ionic-angular";
import { EventModel } from "../../models/Event";
import { Clipboard } from "@ionic-native/clipboard";
import { ToastController } from "ionic-angular";
import { InAppBrowser } from "@ionic-native/in-app-browser";

/**
 * Generated class for the CouponModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-coupon-modal",
  templateUrl: "coupon-modal.html"
})
export class CouponModalPage {
  event: EventModel;

  constructor(
    public navCtrl: NavController,
    private viewCtrl: ViewController,
    private iab: InAppBrowser,
    public navParams: NavParams,
    private clipboard: Clipboard,
    public toastCtrl: ToastController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad CouponModalPage");

    this.event = this.navParams.get("event");

    console.log(this.event);
  }

  onClose() {
    this.viewCtrl.dismiss();
  }

  onLink() {
    this.iab.create(this.event.buyLink);
  }

  onCopy() {
    this.clipboard.copy(this.event.coupon).then(
      (resolve: string) => {
        this.presentToast();
      },
      (reject: string) => {
        alert("Error: " + reject);
      }
    );
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: "Cupom copiado!",
      duration: 3000
    });
    toast.present();
  }
}
