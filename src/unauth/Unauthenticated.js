import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {Consumer} from '../ContextStore';
import baseStyles from '../baseStyles';

const styles = StyleSheet.create({
  container: {
    ...baseStyles.container,
    backgroundColor: '#98ded3',
  },
  button: baseStyles.button,
  text: baseStyles.text,
});

const Unauthenticated = ({router}) => (
  <Consumer>
    {({setAuth}) => (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setAuth(true);
          }}>
          <Text style={styles.text}>
            &lt;Unauthenticated /&gt;
            {'\n'}
            {'\n'}
            Click this text to set authenticated to true
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            router.pop();
          }}>
          <Text style={styles.text}>Or click this text to pop()</Text>
        </TouchableOpacity>
      </View>
    )}
  </Consumer>
);

export default Unauthenticated;
