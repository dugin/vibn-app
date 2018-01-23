import { Injectable } from "@angular/core";
import { FirebaseProvider } from "../firebase/firebase";

/*
  Generated class for the FilterProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FilterProvider {
  filters;

  events;

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
}
