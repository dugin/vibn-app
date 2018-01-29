import * as EventsActions from "../actions/events.action";
import { filterEvents } from "../utils/utils";

export type Action = EventsActions.All;

const initialState = {
  events: null,
  filteredEvents: null,
  isFirstFetch: true,
  loading: false
};

export function eventsReducer(state = initialState, action: Action) {
  switch (action.type) {
    case EventsActions.GET_EVENTS:
      return { ...state, loading: true, isFirstFetch: true };

    case EventsActions.GET_EVENTS_SUCCESS:
      return {
        ...state,
        events: action.payload,
        filteredEvents: null,
        loading: false,
        isFirstFetch: true
      };

    case EventsActions.FILTER_EVENTS:
      return {
        ...state,
        filteredEvents: filterEvents(
          state.events,
          action.payload,
          state.filteredEvents
        ),
        loading: false,
        isFirstFetch: false
      };

    case EventsActions.UPDATE_EVENTS:
      return {
        ...state,
        events: action.payload,
        isFirstFetch: false
      };

    default:
      return state;
  }
}
