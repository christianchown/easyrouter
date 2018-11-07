const initialState = {
  stack: [],
  animation: undefined,
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
  setTransition: (state, animation) => {
    state.animation = animation;
  },
};

export default router;
