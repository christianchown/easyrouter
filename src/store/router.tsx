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
  tabs: Array<string>;
  animation?: Animation;
  from?: Array<Route>;
  to?: Array<Route>;
}

const initialState: Router = {
  stack: [],
  tabs: [],
  animation: undefined,
  from: undefined,
  to: undefined,
};

export {initialState};

const reducer = (
  state: Router = initialState,
  action: StackAction | TransitionAction | SetTabsAction | SetSelectedTabAction | SetShowTabAction | OtherAction,
) => {
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
        from: undefined,
        to: undefined,
      };

    case 'ROUTER_TRANSITION':
      return {
        ...state,
        animation: action.animation,
        from: action.from,
        to: action.to,
      };

    default:
      return state;
  }
};

export default reducer;
