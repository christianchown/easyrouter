import {Animation} from 'react-native-easy-router';
import {OtherAction} from './reducer';

export interface StackAction {
  type: 'ROUTER_STACK';
  stack: Array<Route>;
}

export interface TransitionAction {
  type: 'ROUTER_TRANSITION';
  from: Array<Route>;
  to: Array<Route>;
  animation: Animation;
}

export interface Route {
  id: string;
  route: string;
  params: {
    [key: string]: string;
  };
}

export interface Router {
  stack: Array<Route>;
  animation?: Animation;
}

const initialState: Router = {
  stack: [],
  animation: undefined,
};

export {initialState};

const reducer = (state: Router = initialState, action: StackAction | TransitionAction | OtherAction) => {
  switch (action.type) {
    case 'ROUTER_STACK':
      return {
        ...state,
        stack: action.stack.map((route) => ({
          id: route.id,
          route: route.route,
          params: route.params,
        })),
        animation: undefined,
      };

    case 'ROUTER_TRANSITION':
      return {
        ...state,
        animation: action.animation,
      };

    default:
      return state;
  }
};

export default reducer;
