import React from 'react';
import {Animated, View, Text} from 'react-native';
import easingFunctions from 'react-native-animatable-promise/easing';
import baseStyles from './styles';
import Button from './Button';

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column-reverse',
  },
  header: {
    backgroundColor: '#f5c16c',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: baseStyles.button,
  tab: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
  underline: {
    height: 5,
    width: 1,
    backgroundColor: '#aa530e',
    position: 'absolute',
    bottom: 0,
    left: -0.5,
  },
  tipText: {
    margin: 10,
    fontSize: 13,
    textAlign: 'left',
    color: 'rgba(0,0,0,0.4)',
  },
};

const screenAnimation = {type: 'effect', duration: 900, easing: 'ease-in-out-back'};

class Tabs extends React.Component {
  state = {
    animation: new Animated.Value(0),
    layouts: {},
  };

  componentDidUpdate(prevProps) {
    const {from, to, transition: {easing, duration} = {}} = this.props;
    if (from && to && from !== to && (from !== prevProps.from || to !== prevProps.to)) {
      Animated.timing(this.state.animation, {
        toValue: 1,
        easing: easingFunctions[easing],
        duration,
        useNativeDriver: true,
      }).start();
    }
  }

  onLayout = (screen, e) => {
    const {
      nativeEvent: {layout},
    } = e;
    this.setState((oldState) => ({
      layouts: {
        ...oldState.layouts,
        [screen]: layout,
      },
    }));
  };

  getPos = (screen) => {
    const {layouts} = this.state;
    return layouts[screen] || {x: -10000, width: 0};
  };

  pressMenu = () => {
    this.props.openDrawer();
  };

  press1 = async () => {
    const {router: {push} = {}} = this.props;
    await push.LoggedIn({}, screenAnimation);
  };

  press2 = async () => {
    const {router: {push} = {}} = this.props;
    await push.LoggedIn2({}, screenAnimation);
  };

  render() {
    const {children, from, to} = this.props;
    const {animation} = this.state;

    const fromPos = this.getPos(from);
    const toPos = this.getPos(to);
    const translateX =
      !from || from === to
        ? toPos.x + toPos.width / 2 || -10000
        : animation.interpolate({
            inputRange: [0, 1],
            outputRange: [fromPos.x + fromPos.width / 2, toPos.x + toPos.width / 2],
          });
    const scaleX =
      !from || from === to
        ? toPos.width || 0
        : animation.interpolate({
            inputRange: [0, 1],
            outputRange: [fromPos.width, toPos.width],
          });

    return (
      <View style={styles.container}>
        {children}
        <View style={styles.header}>
          <View style={styles.tabs}>
            <Button
              style={[styles.button, styles.tab]}
              onPress={this.press1}
              disabled={to === 'LoggedIn'}
              onLayout={(layout) => {
                this.onLayout('LoggedIn', layout);
              }}
              text="LoggedIn"
            />
            <Button
              style={[styles.button, styles.tab]}
              onPress={this.press2}
              disabled={to === 'LoggedIn2'}
              onLayout={(layout) => {
                this.onLayout('LoggedIn2', layout);
              }}
              text="Logged In 2"
            />
            <Button style={[styles.button, styles.tab]} onPress={this.pressMenu} text="MENU" />
          </View>
          <View>
            <Animated.View style={[styles.underline, {transform: [{translateX}, {scaleX}]}]} />
          </View>
          <Text style={styles.tipText}>Click links to push.Screen({JSON.stringify(screenAnimation)})</Text>
        </View>
      </View>
    );
  }
}

export default Tabs;
