import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import baseStyles from '../baseStyles';

const styles = StyleSheet.create({
  button: baseStyles.button,
  text: baseStyles.text,
});

export default ({router}) => (
  <TouchableOpacity
    style={styles.button}
    onPress={() => {
      router.pop();
    }}>
    <Text style={styles.text}>Click to pop()</Text>
  </TouchableOpacity>
);
