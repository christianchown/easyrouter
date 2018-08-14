import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {Router} from 'react-native-easy-router';
import baseStyles from '../baseStyles';
import Stack from '../components/Stack';

const styles = StyleSheet.create({
  container: {
    ...baseStyles.container,
    backgroundColor: '#1b3764',
  },
  button: baseStyles.button,
  text: baseStyles.text,
});

const animation = {type: 'top', duration: 1000};

interface Props {
  router: Router;
}

const LoggedIn = ({router}: Props) => (
  <View style={styles.container}>
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        router.push.LoggedIn2({}, animation);
      }}
    >
      <Text style={styles.text}>
        &lt;LoggedIn /&gt;
        {'\n'}
        {'\n'}
        Click this to push.LoggedIn2(
        {'{}'}, {JSON.stringify(animation)})
      </Text>
    </TouchableOpacity>

    <Stack />
  </View>
);

export default LoggedIn;
