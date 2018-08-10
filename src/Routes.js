import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import EasyRouter from 'react-native-easy-router';

import Drawer from './components/Drawer';
import Sidenav from './components/Sidenav';
import Tabs from './components/Tabs';
import LoggedIn from './auth/LoggedIn';
import LoggedIn2 from './auth/LoggedIn2';
import unauthRoutes from './unauth';
import Retrieval from './retrieval';

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
    true,
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

  onStackChange = (stack) => {
    console.table(stack); // eslint-disable-line no-console
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
    const {auth, logout} = this.props;
    const {router} = this.state;
    return (
      <React.Fragment>
        {!auth.login && (
          <EasyRouter
            routes={unauthRoutes}
            initialRoute="CodeOrLogin"
            animations={animations}
            onStackChange={this.onStackChange}
            router={(r) => {
              this.setRouter(r);
            }}
          />
        )}

        {auth.login && !auth.retrieved && <Retrieval router={router} retrieveAmount={auth.retrieveAmount} />}

        {auth.login && auth.retrieved && (
          <Drawer
            navigationView={() => <Sidenav logout={logout} router={router} closeDrawer={this.closeDrawer} />}
            ref={this.drawer}>
            <Tabs initialRoute="LoggedIn" router={router} openDrawer={this.openDrawer}>
              <EasyRouter
                routes={authRoutes}
                initialRoute="LoggedIn"
                animations={animations}
                onStackChange={this.onStackChange}
                router={(r) => {
                  this.setRouter(r);
                }}
              />
            </Tabs>
          </Drawer>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({auth}) => ({
  auth,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setStack: (stack) => ({type: 'ROUTER_STACK', stack}),
      logout: () => ({type: 'AUTH_LOGOUT'}),
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Routes);
