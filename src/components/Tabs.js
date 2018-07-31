import React from 'react';
import {Dimensions, StyleSheet, View, TouchableOpacity, Text} from 'react-native';
const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabs: {
    position: 'absolute',
    backgroundColor: '#f0e3c4',
    top: 0,
    width,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: 'rgba(0,0,0,.4)',
    padding: 10,
    margin: 10,
  },
  text: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
});

const Tabs = ({router, openDrawer, children}) => (
  <View style={styles.container}>
    {children}
    <View style={styles.tabs}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          router.push.LoggedIn({}, {type: 'left', duration: 1000});
        }}>
        <Text style={styles.text}>
          LoggedIn
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          router.push.LoggedIn2({}, {type: 'right', duration: 1000});
        }}>
        <Text style={styles.text}>
          LoggedIn2
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          openDrawer();
        }}>
        <Text style={styles.text}>
          MENU
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default Tabs;
