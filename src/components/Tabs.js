import React from 'react';
import {Dimensions, StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {connect} from 'react-redux';
import baseStyles from '../baseStyles';

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
  button: {
    ...baseStyles.button,
    margin: 10,
    marginBottom: 0,
  },
  text: baseStyles.text,
  selectedText: {
    ...baseStyles.text,
    color: 'rgba(255,255,255,0.4)',
  },
  tabsText: {
    margin: 10,
    fontSize: 13,
    textAlign: 'left',
    color: 'rgba(0,0,0,0.4)',
  },
});

const anim = {type: 'effect', duration: 1100, easing: 'ease-in-out-back'};

class Tabs extends React.Component {
  press1 = async () => {
    const {
      router: {push},
    } = this.props;
    await push.LoggedIn({}, anim);
  };

  press2 = async () => {
    const {
      router: {push},
    } = this.props;
    await push.LoggedIn2({}, anim);
  };

  pressMenu = () => {
    this.props.openDrawer();
  };

  render() {
    const {children, screen, animation} = this.props;
    const {route: selected} = screen;
    return (
      <View style={styles.container}>
        {children}
        <View style={styles.header}>
          <View style={styles.tabs}>
            <TouchableOpacity style={styles.button} onPress={this.press1} disabled={selected === 'LoggedIn'}>
              <Text style={selected === 'LoggedIn' && !animation ? styles.selectedText : styles.text}>LoggedIn</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={this.press2} disabled={selected === 'LoggedIn2'}>
              <Text style={selected === 'LoggedIn2' && !animation ? styles.selectedText : styles.text}>LoggedIn2</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={this.pressMenu}>
              <Text style={styles.text}>MENU</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.tabsText}>{JSON.stringify(anim)}</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({router}) => ({
  screen: router.stack[router.stack.length - 1],
  animation: router.animation,
});

export default connect(mapStateToProps)(Tabs);
