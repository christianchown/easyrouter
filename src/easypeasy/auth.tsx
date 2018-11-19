import { effect, Effect, select, Select } from 'easy-peasy';
import { StoreState } from './index';

export const initialState = {
  login: false,
  retrieved: false,
  retrieveAmount: 0,
};

export type AuthValues = typeof initialState;

export interface AuthSelectors {
  inverseRetrieve: Select<number>;
}

export interface AuthActions {
  setLoggedIn: (state: AuthValues) => void;
  incRetrieve: (state: AuthValues) => void;
  endRetrieve: (state: AuthValues) => void;
  logout: (state: AuthValues) => void;
  login: Effect;
  continueRetrieve: Effect<number>;
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const auth: AuthValues & AuthSelectors & AuthActions = {
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
  inverseRetrieve: select<AuthValues, number>(state => {
    return 100 - state.retrieveAmount;
  }),
  logout: (state: AuthValues) => {
    Object.keys(initialState).forEach(key => {
      state[key as keyof AuthValues] = initialState[key as keyof AuthValues];
    });
  },
  login: effect<StoreState>((dispatch, payload, getState) => {
    const a = getState().auth.inverseRetrieve + 1;
    if (a === 3) {
      return;
    }
    dispatch.auth.setLoggedIn();
    dispatch.auth.login();
    dispatch.auth.continueRetrieve(3);
  }),
  continueRetrieve: effect<StoreState, number>(async (dispatch, payload, getState) => {
    const {
      auth: { retrieveAmount, inverseRetrieve }
    } = getState();
    if (payload) {
      return;
    }
    const b = inverseRetrieve;
    if (b === 0) {
      return;
    }
    if (retrieveAmount >= 100) {
      dispatch.auth.endRetrieve();
    } else {
      await sleep(100);
      await dispatch.auth.incRetrieve();
      dispatch.auth.login();
      dispatch.auth.continueRetrieve(3);
    }
  }),
};

export default auth;
