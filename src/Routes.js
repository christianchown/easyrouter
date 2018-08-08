import React from 'react';
import EasyRouter from 'react-native-easy-router';

import {Consumer} from './ContextStore';
import Drawer from './components/Drawer';
import Sidenav from './components/Sidenav';
import Tabs from './components/Tabs';
import Intro from './unauth/Intro';
import Unauthenticated from './unauth/Unauthenticated';
import LoggedIn from './auth/LoggedIn';
import LoggedIn2 from './auth/LoggedIn2';

const unauthRoutes = {
  Intro,
  Unauthenticated,
};

const authRoutes = {
  LoggedIn,
  LoggedIn2,
};

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
    true
  ],
};

class Routes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      router: undefined,
    };
    this.drawer = React.createRef();
  }

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

  onStackChange = (stack) => {
    console.table(stack);
  };

  render() {
    return (
      <Consumer>
        {({setAuth, auth}) => (
          <React.Fragment>
            {!auth.authenticated && (
              <EasyRouter
                routes={unauthRoutes}
                initialRoute="Intro"
                animations={animations}
                onStackChange={this.onStackChange}
                router={(router) => {
                  this.setRouter(router);
                }}
              />
            )}

            {auth.authenticated && (
              <Drawer
                navigationView={() => (
                  <Sidenav setAuth={setAuth} router={this.state.router} closeDrawer={this.closeDrawer} />
                )}
                ref={this.drawer}>
                <Tabs initialRoute="LoggedIn" router={this.state.router} openDrawer={this.openDrawer}>
                  <EasyRouter
                    routes={authRoutes}
                    initialRoute="LoggedIn"
                    animations={animations}
                    onStackChange={this.onStackChange}
                    router={(router) => {
                      this.setRouter(router);
                    }}
                  />
                </Tabs>
              </Drawer>
            )}
          </React.Fragment>
        )}
      </Consumer>
    );
  }
}

export default Routes;
