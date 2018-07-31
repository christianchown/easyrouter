import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import baseStyles from '../baseStyles';

const styles = StyleSheet.create({
  container: {
    ...baseStyles.container,
    backgroundColor: '#59057b',
  },
  button: baseStyles.button,
  text: baseStyles.text,
});

const animation = {type: 'top', duration: 1000};

const LoggedIn2 = ({router}) => (
  <View style={styles.container}>
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        router.pop(animation);
      }}>
      <Text style={styles.text}>
        &lt;LoggedIn2 /&gt;
        {'\n'}
        {'\n'}
        Click this to pop({JSON.stringify(animation)})
      </Text>
    </TouchableOpacity>
  </View>
);

export default LoggedIn2;
