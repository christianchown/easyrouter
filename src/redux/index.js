import {createStore} from 'redux';
import {install} from 'redux-loop';
import reducer, {initialState} from './reducer';

export default createStore(reducer, initialState, install());
