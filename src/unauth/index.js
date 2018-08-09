import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import baseStyles from '../baseStyles';

import CodeEntry from './CodeEntry';
import CodeOrLogin from './CodeOrLogin';
import Login from './Login';
import NewCode from './NewCode';
import SetPassword from './SetPassword';

const styles = StyleSheet.create({
  button: baseStyles.button,
  text: baseStyles.text,
});

const Popper = ({router}) => (
  <TouchableOpacity
    style={styles.button}
    onPress={() => {
      router.pop();
    }}>
    <Text style={styles.text}>Click to pop()</Text>
  </TouchableOpacity>
);
export {Popper};

export default {
  CodeEntry,
  CodeOrLogin,
  Login,
  NewCode,
  SetPassword,
};
