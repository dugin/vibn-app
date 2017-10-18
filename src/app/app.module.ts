import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {LoginPage} from '../pages/login/login';
import {ComponentsModule} from '../components/components.module';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {ENV} from '@app/env';
import {EventsPage} from '../pages/events/events';
import {EventDetailPage} from '../pages/event-detail/event-detail';
import {GeolocationProvider} from '../providers/geolocation/geolocation';
import {Geolocation} from '@ionic-native/geolocation';


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    EventsPage,
    EventDetailPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {}, {links: []}),
    AngularFireModule.initializeApp(ENV.firebasConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    EventsPage,
    EventDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    GeolocationProvider
  ]
})
export class AppModule {
}
