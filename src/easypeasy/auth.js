import {effect} from 'easy-peasy';

const initialState = {
  login: false,
  retrieved: false,
  retrieveAmount: 0,
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const auth = {
  ...initialState,
  setLoggedIn: (state) => {
    state.login = true;
  },
  incRetrieve: (state) => {
    state.retrieveAmount += 1;
  },
  endRetrieve: (state) => {
    state.retrieveAmount = 100;
    state.retrieved = true;
  },
  logout: (state) => {
    Object.keys(initialState).forEach((key) => {
      state[key] = initialState[key];
    });
  },
  login: effect((dispatch) => {
    dispatch.auth.setLoggedIn();
    dispatch.auth.continueRetrieve();
  }),
  continueRetrieve: effect(async (dispatch, payload, getState) => {
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
