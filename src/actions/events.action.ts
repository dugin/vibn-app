import { Action } from "@ngrx/store";

export const GET_EVENTS = "GET_EVENTS";

export const GET_EVENTS_SUCCESS = "GET_EVENTS_SUCCESS";

export const FILTER_EVENTS = "FILTER_EVENTS";

export const FILTER_EVENTS_SUCCESS = "FILTER_EVENTS_SUCCESS";

export const UPDATE_EVENTS = "UPDATE_EVENTS";

export class GetEvents implements Action {
  readonly type = GET_EVENTS;
}

export class GetEventsSuccess implements Action {
  readonly type = GET_EVENTS_SUCCESS;
  constructor(public payload: any) {}
}

export class FilterEvents implements Action {
  readonly type = FILTER_EVENTS;
  constructor(public payload: any) {}
}

export class FilterEventsSuccess implements Action {
  readonly type = FILTER_EVENTS_SUCCESS;
  constructor(public payload: any) {}
}

export class UpdateEvents implements Action {
  readonly type = UPDATE_EVENTS;
  constructor(public payload: any) {}
}

export type All =
  | GetEvents
  | GetEventsSuccess
  | FilterEvents
  | FilterEventsSuccess
  | UpdateEvents;
