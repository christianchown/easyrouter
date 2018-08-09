import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {Consumer} from '../ContextStore';
import baseStyles from '../baseStyles';

const styles = StyleSheet.create({
  container: {
    ...baseStyles.container,
    backgroundColor: '#0f0766',
  },
  button: baseStyles.button,
  text: baseStyles.text,
});

export default () => (
  <Consumer>
    {({setAuth}) => (
      <View style={styles.container}>
        <Text style={styles.text}>&lt;SetPassword /&gt;</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setAuth(true);
          }}>
          <Text style={styles.text}>Click this to set password</Text>
        </TouchableOpacity>
      </View>
    )}
  </Consumer>
);
