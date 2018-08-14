import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {Router} from 'react-native-easy-router';
import baseStyles from '../baseStyles';
import Stack from '../components/Stack';

const styles = StyleSheet.create({
  container: {
    ...baseStyles.container,
    backgroundColor: '#59057b',
  },
  button: baseStyles.button,
  text: baseStyles.text,
});

interface Props {
  router: Router;
}

const LoggedIn2 = ({router}: Props) => (
  <View style={styles.container}>
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        router.pop();
      }}
    >
      <Text style={styles.text}>
        &lt;LoggedIn2 /&gt;
        {'\n'}
        {'\n'}
        Click this to pop()
      </Text>
    </TouchableOpacity>

    <Stack />
  </View>
);

export default LoggedIn2;
