import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import baseStyles from '../baseStyles';

const styles = StyleSheet.create({
  container: {
    ...baseStyles.container,
    backgroundColor: '#de5b7b',
  },
  button: baseStyles.button,
  text: baseStyles.text,
});

const animation = {type: 'fade', duration: 1200};

const Intro = ({router}) => (
  <View style={styles.container}>
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        router.push.Unauthenticated({}, animation);
      }}>
      <Text style={styles.text}>
        &lt;Intro /&gt;
        {'\n'}
        {'\n'}
        Click this text to push.Unauthenticated({'{}'}, {JSON.stringify(animation)})
      </Text>
    </TouchableOpacity>
  </View>
);

export default Intro;
