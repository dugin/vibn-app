import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {EventsPage} from './events';
import {GeolocationProvider} from '../../providers/geolocation/geolocation';
import {Geolocation} from '@ionic-native/geolocation';
import {ComponentsModule} from '../../components/components.module';

@NgModule({
  declarations: [
    EventsPage,
  ],
  imports: [
    IonicPageModule.forChild(EventsPage),
    ComponentsModule
  ],
  providers: [
    Geolocation,
    GeolocationProvider
  ]
})
export class EventsPageModule {}
