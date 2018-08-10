import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import baseStyles from '../baseStyles';

const styles = StyleSheet.create({
  container: {
    ...baseStyles.container,
    backgroundColor: '#5c3c10',
  },
  button: baseStyles.button,
  text: baseStyles.text,
});

const animation = {type: 'right', duration: 1100};

const Sidenav = ({router, logout, closeDrawer}) => (
  <View style={styles.container}>
    <Text style={styles.text}>
      &lt;Sidenav /&gt;
      {'\n'}
      {'\n'}
    </Text>

    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        if (router) {
          router.push.LoggedIn2({}, animation);
        }
        closeDrawer();
      }}>
      <Text style={styles.text}>
        Click this text to push.LoggedIn2({'{}'}, {JSON.stringify(animation)})
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        closeDrawer();
      }}>
      <Text style={styles.text}>Close the drawer</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        logout();
      }}>
      <Text style={styles.text}>Or log out</Text>
    </TouchableOpacity>
  </View>
);

export default Sidenav;
