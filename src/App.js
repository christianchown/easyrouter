import React from 'react';
import {Provider, initialState} from './ContextStore';
import Routes from './Routes';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
      app: this,
      setAuth: this.setAuth,
    };
  }

  setAuth = (authenticated) => {
    this.setState((oldState) => ({
      auth: {
        ...oldState.auth,
        authenticated,
      },
    }));
  };

  render() {
    const value = this.state;
    return (
      <Provider value={value}>
        <Routes />
      </Provider>
    );
  }
}
