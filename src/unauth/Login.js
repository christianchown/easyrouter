import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {Consumer} from '../ContextStore';
import baseStyles from '../baseStyles';
import animation from './animation';
import {Popper} from './index';

const styles = StyleSheet.create({
  container: {
    ...baseStyles.container,
    backgroundColor: '#e01171',
  },
  button: baseStyles.button,
  text: baseStyles.text,
});

export default ({router}) => (
  <Consumer>
    {({setAuth}) => (
      <View style={styles.container}>
        <Text style={styles.text}>&lt;Login /&gt;</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setAuth(true);
          }}>
          <Text style={styles.text}>Click this to login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            router.push.NewCode({}, animation);
          }}>
          <Text style={styles.text}>Request a new code</Text>
        </TouchableOpacity>

        <Popper router={router} />
      </View>
    )}
  </Consumer>
);
