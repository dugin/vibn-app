import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CouponModalPage } from './coupon-modal';
import {Clipboard} from '@ionic-native/clipboard';
import {InAppBrowser} from '@ionic-native/in-app-browser';

@NgModule({
  declarations: [
    CouponModalPage
  ],
  imports: [
    IonicPageModule.forChild(CouponModalPage)
  ],
  providers: [
    Clipboard,
    InAppBrowser
  ]
})
export class CouponModalPageModule {}
