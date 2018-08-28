import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import baseStyles from '../baseStyles';
import Stack from './Stack';

const styles = StyleSheet.create({
  container: baseStyles.container,
  button: baseStyles.button,
  text: baseStyles.text,
});

interface Props {
  backgroundColor: string;
  title: string;
  children: React.ReactNode;
}

export default ({backgroundColor, title, children}: Props) => (
  <View style={[styles.container, {backgroundColor}]}>
    <Text style={styles.text}>
      &lt;
      {title} /&gt;
      {'\n'}
    </Text>
    {children}
    <Stack />
  </View>
);
