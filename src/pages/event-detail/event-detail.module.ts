import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {EventDetailPage} from './event-detail';
import {ComponentsModule} from '../../components/components.module';
import {InAppBrowser} from '@ionic-native/in-app-browser';

@NgModule({
  declarations: [
    EventDetailPage
  ],
  imports: [
    IonicPageModule.forChild(EventDetailPage),
    ComponentsModule,
  ],
  providers: [
    InAppBrowser,
  ],

})
export class EventDetailPageModule {
}
