import {combineReducers} from 'redux-loop';

import auth, {initialState as initialAuthState} from './auth';
import router, {initialState as initialRouterState} from './router';

const initialState = {
  auth: initialAuthState,
  router: initialRouterState,
};

export {initialState};

export default combineReducers({
  auth,
  router,
});
