import {createStore} from 'easy-peasy';
import {composeWithDevTools} from 'remote-redux-devtools';
import auth from './auth';
import router from './router';

const store = createStore(
  {
    auth,
    router,
  },
  {
    config: {
      compose: composeWithDevTools({realtime: true}),
    },
  },
);

export default store;
