import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { Observable } from "rxjs/Observable";
import * as EventsActions from "../actions/events.action";
import { FirebaseProvider } from "../providers/firebase/firebase";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
export type Action = EventsActions.All;

@Injectable()
export class EventsEffects {
  constructor(
    private actions: Actions,
    private firebaseProvider: FirebaseProvider
  ) {}

  @Effect()
  getEvents: Observable<Action> = this.actions
    .ofType(EventsActions.GET_EVENTS)
    .mergeMap(() => this.firebaseProvider.getAllEvents())
    .map(events => new EventsActions.GetEventsSuccess(events));
}
