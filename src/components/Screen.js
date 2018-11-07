import React from 'react';
import {View, Text} from 'react-native';
import styles from '../baseStyles';

export default ({backgroundColor, title, children}) => (
  <View style={[styles.container, {backgroundColor}]}>
    <Text style={styles.text}>
      &lt;
      {title} /&gt;
      {'\n'}
    </Text>
    {children}
  </View>
);
