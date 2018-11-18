import { RouterStack, Animation } from 'react-native-easy-router';

export interface RouterStackValues {
  id: string;
  route: string;
  params: any;
  animation?: Animation;
}

interface RouterAnimation {
  animation: Animation | undefined;
  from: Array<RouterStackValues> | undefined;
  to: Array<RouterStackValues> | undefined;
}

export interface RouterValues extends RouterAnimation {
  stack: Array<RouterStackValues>;
}

export interface RouterActions {
  setStack: (state: RouterValues, routes: RouterStack) => void;
  setTransition: (state: RouterValues, { animation, from, to }: RouterAnimation) => void;
}

const initialState: RouterValues = {
  stack: [],
  animation: undefined,
  from: undefined,
  to: undefined,
};

export { initialState };

const router: RouterValues & RouterActions = {
  ...initialState,
  setStack: (state: RouterValues, routes: RouterStack) => {
    state.stack = routes.map(route => ({
      id: route.id,
      route: route.route,
      params: route.params,
    }));
    state.animation = undefined;
  },
  setTransition: (state: RouterValues, { animation, from, to }: RouterAnimation) => {
    state.animation = animation;
    state.from = from;
    state.to = to;
  },
};

export default router;
