import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#de5b7b',
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

const animation = {type: 'fade', duration: 1000};

const Intro = ({router}) => (
  <View style={styles.container}>
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        router.push.Unauthenticated({}, animation);
      }}>
      <Text style={styles.text}>
        This is screens/Intro
        {'\n'}
        It has a pinkish background.
        {'\n'}
        Click this text to push.Unauthenticated({'{}'}, {JSON.stringify(animation)})
      </Text>
    </TouchableOpacity>
  </View>
);

export default Intro;
