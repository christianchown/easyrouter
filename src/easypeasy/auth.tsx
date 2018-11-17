import {effect, Effect, Dispatch, Function} from 'easy-peasy';
import {StoreState} from './index';

const initialState = {
  login: false,
  retrieved: false,
  retrieveAmount: 0,
};

export type AuthValues = typeof initialState;

export interface AuthActions {
  setLoggedIn: Function;
  incRetrieve: Function;
  endRetrieve: Function;
  logout: Function;
  login: Effect<StoreState>;
  continueRetrieve: Effect<StoreState>;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const auth: AuthValues & AuthActions = {
  ...initialState,
  setLoggedIn: (state: AuthValues) => {
    state.login = true;
  },
  incRetrieve: (state: AuthValues) => {
    state.retrieveAmount += 1;
  },
  endRetrieve: (state: AuthValues) => {
    state.retrieveAmount = 100;
    state.retrieved = true;
  },
  logout: (state: AuthValues) => {
    Object.keys(initialState).forEach((key) => {
      state[key as keyof AuthValues] = initialState[key as keyof AuthValues];
    });
  },
  login: effect<StoreState>((dispatch: Dispatch<StoreState>) => {
    dispatch.auth.setLoggedIn();
    dispatch.auth.continueRetrieve();
  }),
  continueRetrieve: effect<StoreState>(async (dispatch: Dispatch<StoreState>, payload, getState:() => StoreState) => {
    const {
      auth: {retrieveAmount},
    } = getState();
    if (retrieveAmount >= 100) {
      dispatch.auth.endRetrieve();
    } else {
      await sleep(100);
      await dispatch.auth.incRetrieve();
      dispatch.auth.continueRetrieve();
    }
  }),
};

export default auth;
