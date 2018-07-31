import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b3764',
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

const LoggedIn = ({router}) => (
  <View style={styles.container}>
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        router.push.LoggedIn2({}, animation);
      }}>
      <Text style={styles.text}>
        This is screens/LoggedIn
        {'\n'}
        It has a blue background.
        {'\n'}
        Click this to push.LoggedIn2({'{}'}, {JSON.stringify(animation)})
      </Text>
    </TouchableOpacity>
  </View>
);

export default LoggedIn;
