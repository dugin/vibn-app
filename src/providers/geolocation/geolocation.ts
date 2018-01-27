import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { Geolocation } from "@ionic-native/geolocation";
import { EventModel } from "../../models/Event";
import { getDistance } from "geolib";
import { Observable } from "rxjs/Observable";
import { Constants } from "../../utils/constants";
import { toLatLng } from "../../utils/utils";

/*
  Generated class for the GeolocationProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class GeolocationProvider {
  constructor(private geolocation: Geolocation) {}

  getUsersLocation() {
    return Observable.fromPromise(this.geolocation.getCurrentPosition());
  }

  setEventsDistance(usersLatLng: any, events: EventModel[]): any {
    return events.map(e => {
      return {
        ...e,
        distance: getDistance(
          usersLatLng,
          toLatLng(e.coordinates._lat, e.coordinates._long),
          Constants.ACCURACY
        )
      };
    });
  }
}
