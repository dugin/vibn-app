import { Action } from "@ngrx/store";

export const GET_EVENTS = "GET_EVENTS";

export const GET_EVENTS_SUCCESS = "GET_EVENTS_SUCCESS";

export class GetEvents implements Action {
  readonly type = GET_EVENTS;

  constructor() {}
}

export class GetEventsSuccess implements Action {
  readonly type = GET_EVENTS_SUCCESS;
  constructor(public payload: any) {}
}

export type All = GetEvents | GetEventsSuccess;
