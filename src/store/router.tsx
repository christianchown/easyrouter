import {Animation} from 'react-native-easy-router';
import {loop, Cmd} from 'redux-loop';
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

export interface SetTabsAction {
  type: 'ROUTER_SET_TABS';
  tabs: Array<string>;
}

export interface SetSelectedTabAction {
  type: 'ROUTER_SET_SELECTED_TAB';
  selectedTab: number;
}

export interface SetShowTabAction {
  type: 'ROUTER_SET_SHOW_TAB';
  showTab: number;
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
  selectedTab: number;
  showTab: number;
}

const initialState: Router = {
  stack: [],
  tabs: [],
  animation: undefined,
  selectedTab: -1,
  showTab: -1,
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
      };

    case 'ROUTER_TRANSITION':
      return {
        ...state,
        animation: action.animation,
      };

    case 'ROUTER_SET_TABS':
      return {
        ...state,
        tabs: action.tabs,
        selectedTab: state.stack.length
          ? action.tabs.findIndex((tab) => tab === state.stack[state.stack.length - 1].route)
          : -1,
        showTab: state.stack.length
          ? action.tabs.findIndex((tab) => tab === state.stack[state.stack.length - 1].route)
          : -1,
      };

    case 'ROUTER_SET_SELECTED_TAB':
      return {
        ...state,
        selectedTab: action.selectedTab,
      };

    case 'ROUTER_SET_SHOW_TAB':
      return {
        ...state,
        showTab: action.showTab,
      };

    default:
      return state;
  }
};

export default reducer;
