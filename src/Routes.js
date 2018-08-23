import React from 'react';
import {View} from 'react-native';
import EasyRouter from 'react-native-easy-router';

import {Consumer} from './ContextStore';

import Drawer from './components/Drawer';
import Sidenav from './components/Sidenav';
import Tabs from './components/Tabs';

import Intro from './screens/unauth/Intro';
import Unauthenticated from './screens/unauth/Unauthenticated';
import LoggedIn from './screens/auth/LoggedIn';
import LoggedIn2 from './screens/auth/LoggedIn2';

const animations = {
  effect: [
    {
      opacity: 0,
      transform: [{scale: 0}],
    },
    {
      opacity: 1,
      transform: [{scale: 1}],
    },
    true,
  ],
};

class Routes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      router: undefined,
      animation: undefined,
      from: undefined,
      to: undefined,
    };
    this.drawer = React.createRef();
  }

  onStackChange = (stack) => {
    this.setState({
      animation: undefined,
      from: undefined,
      to: (stack[stack.length - 1] || {}).route,
    });
  };

  onBeforeStackChange = (animation, fromStack, toStack) => {
    const from = (fromStack[fromStack.length - 1] || {}).route;
    const to = (toStack[toStack.length - 1] || {}).route;
    this.setState({animation, from, to});
  };

  setRouter = (router) => {
    this.setState({router});
  };

  closeDrawer = () => {
    if (this.drawer.current.closeDrawer) {
      this.drawer.current.closeDrawer();
    }
  };

  openDrawer = () => {
    if (this.drawer.current.openDrawer) {
      this.drawer.current.openDrawer();
    }
  };

  render() {
    return (
      <Consumer>
        {({setAuth, auth: {authenticated}}) => (
          <View style={{backgroundColor: 'black', flex: 1}}>
            {!authenticated && (
              <EasyRouter
                routes={{
                  Intro,
                  Unauthenticated,
                }}
                initialRoute="Intro"
                animations={animations}
                onStackChange={this.onStackChange}
                onBeforeStackChange={this.onBeforeStackChange}
                router={(router) => {
                  this.setRouter(router);
                }}
              />
            )}

            {authenticated && (
              <Drawer
                renderNavigationView={() => (
                  <Sidenav setAuth={setAuth} router={this.state.router} closeDrawer={this.closeDrawer} />
                )}
                ref={this.drawer}>
                <Tabs
                  router={this.state.router}
                  openDrawer={this.openDrawer}
                  from={this.state.from}
                  to={this.state.to}
                  transition={this.state.animation}>
                  <EasyRouter
                    routes={{
                      LoggedIn,
                      LoggedIn2,
                    }}
                    initialRoute="LoggedIn"
                    animations={animations}
                    onStackChange={this.onStackChange}
                    onBeforeStackChange={this.onBeforeStackChange}
                    router={(router) => {
                      this.setRouter(router);
                    }}
                  />
                </Tabs>
              </Drawer>
            )}
          </View>
        )}
      </Consumer>
    );
  }
}

export default Routes;
