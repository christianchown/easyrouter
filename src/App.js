import React from 'react';
import {Provider, initialState} from './ContextStore';
import Routes from './Routes';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
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
    return (
      <Provider value={this.state}>
        <Routes />
      </Provider>
    );
  }
}
