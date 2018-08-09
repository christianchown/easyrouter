import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import baseStyles from '../baseStyles';
import animation from './animation';
import {Popper} from './index';

const styles = StyleSheet.create({
  container: {
    ...baseStyles.container,
    backgroundColor: '#de5b7b',
  },
  button: baseStyles.button,
  text: baseStyles.text,
});

export default ({router}) => (
  <View style={styles.container}>
    <Text style={styles.text}>&lt;CodeEntry /&gt;</Text>

    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        router.push.SetPassword({}, animation);
      }}>
      <Text style={styles.text}>Click to enter a valid code</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        router.push.NewCode({}, animation);
      }}>
      <Text style={styles.text}>Click to request a new code</Text>
    </TouchableOpacity>

    <Popper router={router} />
  </View>
);
