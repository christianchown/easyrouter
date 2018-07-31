import React from 'react';
import {Dimensions, StyleSheet, View, TouchableOpacity, Text} from 'react-native';
const {width} = Dimensions.get('screen');
import baseStyles from '../baseStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column-reverse',
  },
  tabs: {
    backgroundColor: '#f0e3c4',
    width,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    ...baseStyles.button,
    margin: 10,
  },
  text: baseStyles.text,
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
