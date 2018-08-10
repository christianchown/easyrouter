import {compose} from 'redux';

const initialState = {
  stack: [],
};

export {initialState};

const reducer = (state = initialState, action) => {
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
