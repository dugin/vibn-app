import * as UserActions from "../actions/user.action";

export type Action = UserActions.All;

const initialState = {
  user: {},
  loading: false
};

export function userReducer(state = initialState, action: Action) {
  switch (action.type) {
    case UserActions.SET_GEOLOCATION:
      return { ...state, loading: true };

    case UserActions.SET_GEOLOCATION_SUCCESS:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
        loading: false
      };

    case UserActions.SET_GEOLOCATION_FAIL:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
        error: action.payload,
        loading: false
      };

    default:
      return state;
  }
}
