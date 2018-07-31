import React from 'react';

const initialState = {
  auth: {
    authenticated: false,
  },
};

const {Provider, Consumer} = React.createContext({
  ...initialState,
  setAuth: () => {},
});

export {initialState, Provider, Consumer};
