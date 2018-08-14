import {createStore} from 'redux';
import {install, StoreCreator} from 'redux-loop';
import reducer, {StoreState, initialState} from './reducer';
import {Auth} from './auth';
import {Route, Router} from './router';

export {Auth, Route, Router, StoreState};
export default (createStore as StoreCreator)(reducer, initialState, install());
