import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { Observable } from "rxjs/Observable";
import * as UserActions from "../actions/user.action";
import { FirebaseProvider } from "../providers/firebase/firebase";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
import { GeolocationProvider } from "../providers/geolocation/geolocation";
export type Action = UserActions.All;

@Injectable()
export class UserEffects {
  constructor(
    private actions: Actions,
    private firebaseProvider: FirebaseProvider,
    private geolocationProvider: GeolocationProvider
  ) {}

  @Effect()
  setGeoLocation: Observable<Action> = this.actions
    .ofType(UserActions.SET_GEOLOCATION)
    .mergeMap(() => this.geolocationProvider.getUsersLocation())
    .map(geolocation => {
      return new UserActions.SetGeolocationSuccess({
        coordinates: {
          latitude: geolocation.coords.latitude,
          longitude: geolocation.coords.longitude
        }
      });
    });
}
