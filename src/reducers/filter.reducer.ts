import * as FilterActions from "../actions/filter.action";

export type Action = FilterActions.All;

const initialState = {
  musicStyle: [],
  locationRegion: [],
  partyKind: [],
  loading: false
};

export function filterReducer(state = initialState, action: Action) {
  switch (action.type) {
    case FilterActions.GET_FILTERS:
      return { ...state, loading: true };

    case FilterActions.GET_FILTERS_SUCCESS:
      const key = Object.keys(action.payload)[0];
      const type = Object.keys(action.payload[key])[0];
      return {
        ...state,
        [key]: action.payload[key][type],
        loading: false
      };

    default:
      return state;
  }
}
