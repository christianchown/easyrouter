import React from 'react';
import {Animated, StyleSheet, View, Text, LayoutChangeEvent} from 'react-native';
import {connect} from 'react-redux';
import {Dispatch, bindActionCreators} from 'redux';
import baseStyles from '../baseStyles';
import {Router, Animation} from 'react-native-easy-router';
import easingFunctions from './react-native-animatable-easing';
import {StoreState} from 'store';
import Button from './Button';

const styles = StyleSheet.create({
  ...baseStyles,
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
    paddingBottom: 5,
  },
  button: {
    ...baseStyles.button,
    marginTop: 10,
  },
  buttonText: {
    ...baseStyles.text,
    fontSize: 16,
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
    marginLeft: 10,
    fontSize: 13,
    color: 'rgba(0,0,0,0.4)',
    flex: 2,
    flexWrap: 'wrap',
  },
  componentText: {
    flex: 1,
    marginBottom: 0,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 16,
    textAlign: 'left',
  },
  textWrap: {
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

const screenAnimation: Animation = {type: 'effect', duration: 900, easing: 'ease-in-out-back'};

interface Props {
  initialRoute: string;
  openDrawer: () => void;
  router: Router;
  tabs: Array<string>;
  from?: string;
  to?: string;
  transition?: Animation;
}

interface PropsFromDispatch {
  setTabs: () => void;
}

type TabsProps = Props & PropsFromDispatch;

interface TabsState {
  animation: Animated.Value;
  layouts: {
    [button: string]: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
  };
}

class Tabs extends React.Component<TabsProps, TabsState> {
  constructor(props: TabsProps) {
    super(props);
    this.state = {
      animation: new Animated.Value(0),
      layouts: {},
    };
  }

  componentDidUpdate(prevProps: TabsProps) {
    const {from, to, transition: {easing, duration} = {easing: '', duration: 0}} = this.props;
    if (from && to && from !== to && (from !== prevProps.from || to !== prevProps.to) && easing) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({animation: new Animated.Value(0)}, () => {
        Animated.timing(this.state.animation, {
          toValue: 1,
          easing: typeof easing === 'string' ? easingFunctions[easing] : easing,
          duration,
          useNativeDriver: true,
        }).start();
      });
    }
  }

  onLayout = (screen: string, e: LayoutChangeEvent) => {
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

  getPos = (screen: string) => {
    const {layouts} = this.state;
    return layouts[screen] || {x: -10000, width: 0};
  };

  pressMenu = () => {
    this.props.openDrawer();
  };

  goto = async (screen: string) => {
    const {router: {push} = {push: undefined}} = this.props;
    if (push) {
      await push[screen]({}, screenAnimation);
    }
  };

  render() {
    const {children, from, to} = this.props;
    const {animation} = this.state;

    const fromPos = this.getPos(from || '');
    const toPos = this.getPos(to || '');
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
              style={styles.button}
              textStyle={styles.buttonText}
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
              style={styles.button}
              textStyle={styles.buttonText}
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
              style={styles.button}
              textStyle={styles.buttonText}
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
            <Button style={styles.button} textStyle={styles.buttonText} onPress={this.pressMenu} text="MENU" />
          </View>
          <View>
            <Animated.View style={[styles.underline, {transform: [{translateX}, {scaleX}]}]} />
          </View>
          <View style={styles.textWrap}>
            <Text style={styles.componentText}>&lt;Tabs /&gt;</Text>
            <Text style={styles.tipText}>
              push[screen](
              {JSON.stringify(screenAnimation)})
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch, {tabs}: Props): PropsFromDispatch =>
  bindActionCreators(
    {
      setTabs: () => ({type: 'ROUTER_SET_TABS', tabs}),
    },
    dispatch,
  );

export default connect<{}, PropsFromDispatch, Props, StoreState>(
  null,
  mapDispatchToProps,
)(Tabs);
