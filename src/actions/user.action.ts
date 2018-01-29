import { Action } from "@ngrx/store";

export const SET_GEOLOCATION = "SET_GEOLOCATION";

export const SET_GEOLOCATION_SUCCESS = "SET_GEOLOCATION_SUCCESS";

export const SET_GEOLOCATION_FAIL = "SET_GEOLOCATION_FAIL";

export class SetGeolocation implements Action {
  readonly type = SET_GEOLOCATION;

  constructor() {}
}

export class SetGeolocationSuccess implements Action {
  readonly type = SET_GEOLOCATION_SUCCESS;
  constructor(public payload: any) {}
}

export class SetGeolocationFail implements Action {
  readonly type = SET_GEOLOCATION_FAIL;
  constructor(public payload: any) {}
}

export type All = SetGeolocation | SetGeolocationSuccess | SetGeolocationFail;
