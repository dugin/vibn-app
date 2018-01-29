import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { Observable } from "rxjs/Observable";
import * as FilterActions from "../actions/filter.action";
import { FirebaseProvider } from "../providers/firebase/firebase";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
export type Action = FilterActions.All;

@Injectable()
export class FilterEffects {
  constructor(
    private actions: Actions,
    private firebaseProvider: FirebaseProvider
  ) {}

  @Effect()
  getFilters: Observable<Action> = this.actions
    .ofType(FilterActions.GET_FILTERS)
    .map((action: FilterActions.GetFilters) => action.payload)
    .mergeMap(id => this.firebaseProvider.getTags(id))
    .map(filter => new FilterActions.GetFiltersSuccess(filter));
}
