import { Injectable } from "@angular/core";
import { FirebaseProvider } from "../firebase/firebase";
import { AsyncSubject } from "rxjs/AsyncSubject";
import isEmpty from "lodash/isEmpty";
import { Observable } from "rxjs/Observable";
import { EventModel } from "../../models/Event";
import { Store } from "@ngrx/store";
import * as filterActions from "./../../actions/filter.action";
/*
  Generated class for the FilterProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

interface AppState {
  filter: any;
}
@Injectable()
export class FilterProvider {
  filters = {
    musicStyle: {
      value: "",
      array: null,
      kind: "name",
      name: "Músicas",
      multipleChoice: true
    },
    locationRegion: {
      value: "",
      array: null,
      kind: "riodejaneiro",
      name: "Locais",
      multipleChoice: true
    },
    partyKind: {
      value: "",
      array: null,
      kind: "name",
      name: "Extras",
      multipleChoice: false
    }
  };

  events = new AsyncSubject<any[]>();
  filteredEvents;

  userLocation = new AsyncSubject();

  filter$: Observable<any>;

  constructor(
    private firebaseProvider: FirebaseProvider,
    private store: Store<AppState>
  ) {
    this.filter$ = this.store.select("filter");
    console.log("Hello FilterProvider Provider");

    this.getFilters();
  }

  getFilters() {
    for (const key of Object.keys(this.filters)) {
      this.store.dispatch(new filterActions.GetFilters(key));
    }
  }

  onFilter(data): Observable<EventModel[]> {
    let shouldShow = true;

    return new Observable(obs => {
      this.events.subscribe(events => {
        if (!isEmpty(data)) {
          this.filteredEvents = events.filter(e => {
            for (const key of Object.keys(e.tags)) {
              let tags = data[key];
              shouldShow = !tags || e.tags[key].some(t => tags.includes(t));
              if (!shouldShow) break;
            }

            return shouldShow;
          });
          obs.next(this.filteredEvents);
        } else if (typeof data !== "undefined") {
          this.filteredEvents = events;
          obs.next(this.filteredEvents);
        } else obs.next(events);

        obs.complete();
      });
    });
  }
}
