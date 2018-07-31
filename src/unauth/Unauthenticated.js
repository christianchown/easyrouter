import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {Consumer} from '../ContextStore';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#98ded3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'rgba(0,0,0,.4)',
    padding: 10,
    margin: 20,
  },
  text: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
});

const animation = {type: 'fade', duration: 1000, useNativeDriver: true};

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
            This is screens/Unauthenticated
            {'\n'}
            It has a cyanish background.
            {'\n'}
            Click this text to set authenticated to true
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            router.pop(animation);
          }}>
          <Text style={styles.text}>Or click this text to pop({JSON.stringify(animation)})</Text>
        </TouchableOpacity>
      </View>
    )}
  </Consumer>
);

export default Unauthenticated;
