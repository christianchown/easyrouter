import { createStore, reducer, Reducer } from 'easy-peasy';
import { Action } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import auth, { AuthValues, AuthActions, AuthSelectors } from './auth';
import router, { RouterValues, RouterActions } from './router';

interface BasicState {
  value: number;
}

export interface StoreState {
  auth: AuthValues & AuthActions & AuthSelectors;
  router: RouterValues & RouterActions;
  basic: Reducer<BasicState>;
}

const compose = composeWithDevTools({ realtime: true });

const store = createStore<StoreState>(
  {
    auth,
    router,
    basic: reducer((s: BasicState = { value: 0 }, a: Action) => {
      if (a.type === 'BASIC_ADD') {
        return {
          value: s.value + 1,
        };
      }
      return s;
    }),
  },
  {
    compose,
  },
);

export default store;
