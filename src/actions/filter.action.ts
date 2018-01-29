import { Action } from "@ngrx/store";

export const GET_FILTERS = "GET_FILTERS";

export const GET_FILTERS_SUCCESS = "GET_FILTERS_SUCCESS";

export class GetFilters implements Action {
  readonly type = GET_FILTERS;

  constructor(public payload: any) {}
}

export class GetFiltersSuccess implements Action {
  readonly type = GET_FILTERS_SUCCESS;
  constructor(public payload: any) {}
}

export type All = GetFilters | GetFiltersSuccess;
