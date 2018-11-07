const initialState = {
  stack: [],
  animation: undefined,
  from: undefined,
  to: undefined,
};

export {initialState};

const router = {
  stack: [],
  animation: undefined,
  setStack: (state, routes) => {
    state.stack = routes.map((route) => ({
      id: route.id,
      route: route.route,
      params: route.params,
    }));
    state.animation = undefined;
  },
  setTransition: (state, {animation, from, to}) => {
    state.animation = animation;
    state.from = from;
    state.to = to;
  },
};

export default router;
