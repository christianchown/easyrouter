import {OtherAction} from './reducer';

export interface StackAction {
  type: 'ROUTER_STACK';
  stack: Array<Route>;
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
}

const initialState: Router = {
  stack: [],
};

export {initialState};

const reducer = (state: Router = initialState, action: StackAction | OtherAction) => {
  switch (action.type) {
    case 'ROUTER_STACK':
      return {
        ...state,
        stack: action.stack.map((route) => ({
          id: route.id,
          route: route.route,
          params: route.params,
        })),
      };

    default:
      return state;
  }
};

export default reducer;
