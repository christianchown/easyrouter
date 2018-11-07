import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import EasyRouter from 'react-native-easy-router';

import Drawer from './components/Drawer';
import Sidenav from './components/Sidenav';
import Tabs from './components/Tabs';
import unauthRoutes from './screens/unauth';
import authRoutes from './screens/auth';
import Retrieval from './screens/Retrieval';

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
    this.props.setStack(stack);
  };

  onBeforeStackChange = (animation, from, to) => {
    this.props.setTransition({animation, from, to});
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

const mapStateToProps = ({auth}) => ({
  auth,
});

const mapDispatchToProps = ({auth: {logout}, router: {setStack, setTransition}}) => ({
  setStack,
  setTransition,
  logout,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Routes);
