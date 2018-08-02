import React from 'react';
import {Dimensions, StyleSheet, View, TouchableOpacity, Text} from 'react-native';
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

const animation = {type: 'effect', duration: 1100, easing: 'ease-in-out-back'};

class Tabs extends React.Component {
  state = {selected: this.props.initialRoute};

  press1 = async () => {
    this.setState({selected: 'LoggedIn'});
    await this.props.router.push.LoggedIn({}, animation);
  };

  press2 = async () => {
    this.setState({selected: 'LoggedIn2'});
    await this.props.router.push.LoggedIn2({}, animation);
  };

  pressMenu = () => {
    this.props.openDrawer();
  };

  render() {
    const {children} = this.props;
    const {selected} = this.state;
    return (
      <View style={styles.container}>
        {children}
        <View style={styles.header}>
          <View style={styles.tabs}>
            <TouchableOpacity style={styles.button} onPress={this.press1} disabled={selected === 'LoggedIn'}>
              <Text style={selected === 'LoggedIn' ? styles.selectedText : styles.text}>LoggedIn</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={this.press2} disabled={selected === 'LoggedIn2'}>
              <Text style={selected === 'LoggedIn2' ? styles.selectedText : styles.text}>LoggedIn2</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={this.pressMenu}>
              <Text style={styles.text}>MENU</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.tabsText}>{JSON.stringify(animation)}</Text>
        </View>
      </View>
    );
  }
}

export default Tabs;
