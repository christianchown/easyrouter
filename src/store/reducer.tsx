import {combineReducers} from 'redux-loop';

import auth, {Auth, initialState as initialAuthState} from './auth';
import router, {Router, initialState as initialRouterState} from './router';

export interface StoreState {
  auth: Auth;
  router: Router;
}

const initialState: StoreState = {
  auth: initialAuthState,
  router: initialRouterState,
};

export interface OtherAction {
  type: 'OTHER_ACTION';
}

export {initialState};

export default combineReducers({
  auth,
  router,
});
