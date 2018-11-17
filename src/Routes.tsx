import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import EasyRouter, { Router, RouterStack, CustomAnimations, Animation } from 'react-native-easy-router';

import Drawer from './components/Drawer';
import Sidenav from './components/Sidenav';
import Tabs from './components/Tabs';
import unauthRoutes from './screens/unauth';
import authRoutes from './screens/auth';
import Retrieval from './screens/Retrieval';

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
  auth: AuthState;
}

interface PropsFromDispatch {
  setStack: (stack: RouterStack) => void;
  setTransition: (transition: {animation: Animation; from: RouterStack; to: RouterStack}) => void;
  logout: () => void;
}

type Props = PropsFromState & PropsFromDispatch;

interface State {
  router: Router | undefined;
}

class Routes extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      router: undefined,
    };
    this.drawer = React.createRef();
  }

  onStackChange = (stack: RouterStack) => {
    this.props.setStack(stack);
  };

  onBeforeStackChange = (animation: Animation, from: RouterStack, to: RouterStack) => {
    this.props.setTransition({animation, from, to});
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
      <View style={{backgroundColor: 'black', flex: 1}}>
        {!auth.login && (
          <EasyRouter
            routes={unauthRoutes}
            initialRoute="CodeOrLogin"
            animations={animations}
            onStackChange={this.onStackChange}
            onBeforeStackChange={this.onBeforeStackChange}
            router={(r) => {
              this.setRouter(r);
            }}
          />
        )}

        {auth.login && !auth.retrieved && <Retrieval router={router} retrieveAmount={auth.retrieveAmount} />}

        {auth.login && auth.retrieved && (
          <Drawer
            renderNavigationView={() => <Sidenav logout={logout} router={router} closeDrawer={this.closeDrawer} />}
            ref={this.drawer}>
            <Tabs initialRoute="Home" router={router} openDrawer={this.openDrawer}>
              <EasyRouter
                routes={authRoutes}
                initialRoute="Home"
                animations={animations}
                onStackChange={this.onStackChange}
                onBeforeStackChange={this.onBeforeStackChange}
                router={(r) => {
                  this.setRouter(r);
                }}
              />
            </Tabs>
          </Drawer>
        )}
      </View>
    );
  }
}

const mapStateToProps = ({auth}: ReduxState) => ({
  auth,
});

const mapDispatchToProps = ({auth: {logout}, router: {setStack, setTransition}}) => ({
  setStack,
  setTransition,
  logout,
});

export default connect<PropsFromState, PropsFromDispatch, {}, ReduxState>(
  mapStateToProps,
  mapDispatchToProps,
)(Routes);
