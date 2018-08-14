import React from 'react';
import {Dispatch, bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import EasyRouter, {Route, Router, CustomAnimations} from 'react-native-easy-router';
import DrawerLayout from 'react-native-drawer-layout-polyfill';

import Drawer from './components/Drawer';
import Sidenav from './components/Sidenav';
import Tabs from './components/Tabs';
import LoggedIn from './auth/LoggedIn';
import LoggedIn2 from './auth/LoggedIn2';
import unauthRoutes from './unauth';
import Retrieval from './retrieval';
import {Auth, StoreState} from './store';

const authRoutes = {
  LoggedIn,
  LoggedIn2,
};

const animations: CustomAnimations = {
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

interface PropsFromState {
  auth: Auth;
}

interface PropsFromDispatch {
  logout: () => void;
  setStack: (stack: Array<Route>) => void;
}

type RoutesProps = PropsFromState & PropsFromDispatch;

interface State {
  router?: Router;
}

class Routes extends React.Component<RoutesProps, State> {
  private drawer: React.RefObject<DrawerLayout>;

  constructor(props: RoutesProps) {
    super(props);
    this.state = {
      router: undefined,
    };
    this.drawer = React.createRef<DrawerLayout>();
  }

  onStackChange = (stack: Array<Route>) => {
    this.props.setStack(stack);
  };

  setRouter = (router: Router) => {
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

        {auth.login && !auth.retrieved && <Retrieval retrieveAmount={auth.retrieveAmount} />}

        {auth.login &&
          router &&
          auth.retrieved && (
            <Drawer
              renderNavigationView={() => <Sidenav logout={logout} router={router} closeDrawer={this.closeDrawer} />}
              ref={this.drawer}
            >
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

const mapStateToProps = ({auth}: StoreState): PropsFromState => ({
  auth,
});

const mapDispatchToProps = (dispatch: Dispatch): PropsFromDispatch =>
  bindActionCreators(
    {
      setStack: (stack) => ({type: 'ROUTER_STACK', stack}),
      logout: () => ({type: 'AUTH_LOGOUT'}),
    },
    dispatch,
  );

export default connect<PropsFromState, PropsFromDispatch, {}, StoreState>(
  mapStateToProps,
  mapDispatchToProps,
)(Routes);
