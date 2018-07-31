import React from 'react';

const initialState = {
  auth: {
    authenticated: false,
  },
  app: undefined,
};

const {Provider, Consumer} = React.createContext({
  ...initialState,
  setAuth: () => {},
});

export {initialState, Provider, Consumer};
