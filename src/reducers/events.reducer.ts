import * as EventsActions from "../actions/events.action";

export type Action = EventsActions.All;

const initialState = {
  events: [],
  loading: false
};

export function eventsReducer(state = initialState, action: Action) {
  switch (action.type) {
    case EventsActions.GET_EVENTS:
      return { ...state, loading: true };

    case EventsActions.GET_EVENTS_SUCCESS:
      return {
        ...state,
        events: action.payload,
        loading: false
      };

    default:
      return state;
  }
}
