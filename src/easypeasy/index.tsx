import {createStore, Dispatch, DispatchesFrom, DispatchFunctions, AuthFunctions3} from 'easy-peasy';
import {composeWithDevTools} from 'remote-redux-devtools';
import auth, {AuthValues, AuthActions} from './auth';
import router, {RouterValues, RouterActions} from './router';

export interface StoreState {
  auth: AuthValues & AuthActions;
  router: RouterValues & RouterActions;
}

type FunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T];
type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;

type LocalDispatchFunctions<V, T extends keyof V> = FunctionProperties<V[T]>;
type LocalDispatchesFrom<Model> = { [index in keyof Model]: LocalDispatchFunctions<Model, index> };



type AF3 = LocalDispatchFunctions<StoreState, 'router'>;
type AF4 = LocalDispatchesFrom<StoreState>;

function (af3: AF3, af4: AF4) {
  af4.auth.setLoggedIn({login: true, retrieved: false, retrieveAmount: 100});
}

function takesAF(af3: AuthFunctions4<StoreState, 'router'>, af: AuthFunctions<'router'>, af2: DispatchFunctions<StoreState, 'router'>) {
  af3.
}

function takesD(d: DispatchesFrom<StoreState>) {

  d.router.
}

const compose = composeWithDevTools({realtime: true});

const store = createStore<StoreState>(
  {
    auth,
    router,
  },
  {
      compose,
  },
);

export default store;
