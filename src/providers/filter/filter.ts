import { Injectable } from "@angular/core";
import { FirebaseProvider } from "../firebase/firebase";
import { AsyncSubject } from "rxjs/AsyncSubject";
import isEmpty from "lodash/isEmpty";
import { Observable } from "rxjs/Observable";
import { EventModel } from "../../models/Event";

/*
  Generated class for the FilterProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FilterProvider {
  filters;

  events = new AsyncSubject<any[]>();
  filteredEvents;

  userLocation = new AsyncSubject();

  constructor(private firebaseProvider: FirebaseProvider) {
    console.log("Hello FilterProvider Provider");

    this.filters = {
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
  }

  getAllTags() {
    for (const key of Object.keys(this.filters)) {
      this.filters[key].array = this.firebaseProvider
        .getTags(key)
        .map(resp => resp[this.filters[key].kind]);
    }
  }

  onFilter(data) {
    let shouldShow = true;

    return new Observable<EventModel[]>(obs => {

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
        } else if (typeof data !== "undefined") {
          this.filteredEvents = events;
        }

        obs.next(this.filteredEvents);
        obs.complete();
      });
    });
  }
}
