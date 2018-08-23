import React from 'react';
import {Easing, Animated, Dimensions, StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import baseStyles from './styles';
import Button from './Button';

const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column-reverse',
  },
  header: {
    backgroundColor: '#f0e3c4',
    width,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tab: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
  tabsText: {
    margin: 10,
    fontSize: 13,
    textAlign: 'left',
    color: 'rgba(0,0,0,0.4)',
  },
  underline: {
    height: 5,
    width: 1,
    backgroundColor: 'red',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
});

const screenAnimation = {type: 'effect', duration: 1100, easing: 'ease-in-out-back'};

class Tabs extends React.Component {
  state = {
    animation: new Animated.Value(0),
    layouts: {},
  };

  componentDidUpdate(prevProps) {
    const {from, to, transition: {duration} = {}} = this.props;
    if (
      from && 
      to && 
      from !== to &&
      (from !== prevProps.from || to !== prevProps.to)
    ) {
      setTimeout(() => {
        Animated.timing(this.state.animation, {
          toValue: 1,
          easing: Easing.easeOutBounce,
          duration,
        }).start(() => {
          this.setState({animation: new Animated.Value(0)});
        });
      }, 0);
    }
  }

  onLayout = (screen, e) => {
    const {nativeEvent: {layout}} = e;
    this.setState((oldState) => ({
      layouts: {
        ...oldState.layouts,
        [screen]: layout,
      },
    }));
  };  

  getPos = (screen) => {
    const {layouts} = this.state;
    return layouts[screen] || {x: -width, width: 0};
  };

  pressMenu = () => {
    this.props.openDrawer();
  };

  press1 = async () => {
    const {
      router: {push},
    } = this.props;
    await push.LoggedIn({}, screenAnimation);
  };

  press2 = async () => {
    const {
      router: {push},
    } = this.props;
    await push.LoggedIn2({}, screenAnimation);
  };

  render() {
    const {children, from, to} = this.props;
    const {animation} = this.state;

    const fromPos = this.getPos(from);
    const toPos = this.getPos(to);
    const translateX =
      !from || from === to
        ? toPos.x || -width
        : animation.interpolate({
            inputRange: [0, 1],
            outputRange: [fromPos.x, toPos.x],
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
          <View>
            <View style={styles.tabs}>
              <View style={styles.tab}>
                <Button 
                  onPress={this.press1}
                  disabled={to === 'LoggedIn'}
                  onLayout={(layout) => {
                    this.onLayout('LoggedIn', layout);
                  }}
                  text="LoggedIn"
                />
              </View>

              <View style={styles.tab}>
                <Button 
                  onPress={this.press2}
                  disabled={to === 'LoggedIn2'}
                  onLayout={(layout) => {
                    this.onLayout('LoggedIn2', layout);
                  }}
                  text="LoggedIn2"
                />
              </View>

              <View style={styles.tab}>
                <Button 
                  onPress={this.pressMenu}
                  text="MENU"
                />
              </View>
            </View>
            <Animated.View style={[styles.underline, {transform: [{translateX}, {scaleX}]}]} />
          </View>
          <Text style={styles.tabsText}>Click links to push.Screen({JSON.stringify(screenAnimation)})</Text>
        </View>
      </View>
    );
  }
}

export default Tabs;
