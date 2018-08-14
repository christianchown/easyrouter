const initialState = {
  stack: [],
  animation: undefined,
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
