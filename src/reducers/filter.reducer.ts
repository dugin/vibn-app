import * as FilterActions from "../actions/filter.action";

export type Action = FilterActions.All;

const initialState = {
  musicStyle: [],
  locationRegion: [],
  partyKind: [],
  filters: {},
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
        loading: false,
        filters: {}
      };

    case FilterActions.SET_FILTERS:
      return { ...state, filters: action.payload };

    default:
      return state;
  }
}
