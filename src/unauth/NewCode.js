import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import baseStyles from '../baseStyles';
import Popper from '../components/Popper';
import Stack from '../components/Stack';

const styles = StyleSheet.create({
  container: {
    ...baseStyles.container,
    backgroundColor: '#757882',
  },
  button: baseStyles.button,
  text: baseStyles.text,
});

export default ({router}) => (
  <View style={styles.container}>
    <Text style={styles.text}>&lt;NewCode /&gt;</Text>

    <Popper router={router} />
    <Stack />
  </View>
);
