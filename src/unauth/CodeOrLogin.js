import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import baseStyles from '../baseStyles';
import animation from './animation';

const styles = StyleSheet.create({
  container: {
    ...baseStyles.container,
    backgroundColor: '#59057b',
  },
  button: baseStyles.button,
  text: baseStyles.text,
});

export default ({router}) => (
  <View style={styles.container}>
    <Text style={styles.text}>&lt;CodeOrLogin /&gt;</Text>

    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        router.push.CodeEntry({}, animation);
      }}>
      <Text style={styles.text}>Click here if you have a code</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        router.push.Login({}, animation);
      }}>
      <Text style={styles.text}>Click here if you already have a login</Text>
    </TouchableOpacity>
  </View>
);