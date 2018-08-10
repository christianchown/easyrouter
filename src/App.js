import React from 'react';
import {Provider} from 'react-redux';
import Routes from './Routes';
import store from './redux';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}
