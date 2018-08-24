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
    backgroundColor: '#f6f3a7',
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
      console.log(`animation ${JSON.stringify(this.getPos(from))} ${JSON.stringify(this.getPos(to))}`);
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({animation: new Animated.Value(0)}, () => {
        Animated.timing(this.state.animation, {
          toValue: 1,
          easing: easingFunctions[easing],
          duration,
          useNativeDriver: true,
        }).start();
      });
    } else {
      console.log(`nope ${JSON.stringify(prevProps.from)}->${JSON.stringify(prevProps.to)} / ${JSON.stringify(from)}->${JSON.stringify(to)}`);
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

  goto = async (screen) => {
    const {router: {push} = {}} = this.props;
    await push[screen]({}, screenAnimation);
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
              disabled={to === 'Home'}
              activeOpacity={0.5}
              onPress={() => {
                this.goto('Home');
              }}
              onLayout={(layout) => {
                this.onLayout('Home', layout);
              }}
              text="Home"
            />
            <Button
              style={[styles.button, styles.tab]}
              disabled={to === 'Profile'}
              activeOpacity={0.5}
              onPress={() => {
                this.goto('Profile');
              }}
              onLayout={(layout) => {
                this.onLayout('Profile', layout);
              }}
              text="Profile"
            />
            <Button
              style={[styles.button, styles.tab]}
              disabled={to === 'Settings'}
              activeOpacity={0.5}
              onPress={() => {
                this.goto('Settings');
              }}
              onLayout={(layout) => {
                this.onLayout('Settings', layout);
              }}
              text="Settings"
            />
            <Button style={[styles.button, styles.tab]} onPress={this.pressMenu} text="MENU" />
          </View>
          <View>
            <Animated.View style={[styles.underline, {transform: [{translateX}, {scaleX}]}]} />
          </View>
          <Text style={styles.tipText}>push[screen]({JSON.stringify(screenAnimation)})</Text>
        </View>
      </View>
    );
  }
}

export default Tabs;
