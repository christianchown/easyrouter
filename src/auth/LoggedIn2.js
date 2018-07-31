import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#59057b',
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

const animation = {type: 'top', duration: 1000};

const LoggedIn2 = ({router}) => (
  <View style={styles.container}>
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        router.pop(animation);
      }}>
      <Text style={styles.text}>
        This is screens/LoggedIn2
        {'\n'}
        It has a purple background.
        {'\n'}
        Click this to pop({JSON.stringify(animation)})
      </Text>
    </TouchableOpacity>
  </View>
);

export default LoggedIn2;
