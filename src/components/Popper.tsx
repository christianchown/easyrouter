import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Router} from 'react-native-easy-router';
import baseStyles from '../baseStyles';

const styles = StyleSheet.create({
  button: baseStyles.button,
  text: baseStyles.text,
});

interface Props {
  router: Router;
}

export default ({router}: Props) => (
  <TouchableOpacity
    style={styles.button}
    onPress={() => {
      router.pop();
    }}
  >
    <Text style={styles.text}>Click to pop()</Text>
  </TouchableOpacity>
);
