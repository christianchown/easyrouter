import React from 'react';
import {View, Text} from 'react-native';
import styles from '../baseStyles';

export default ({backgroundColor, title, children}: {backgroundColor: string; title: string; children: React.ReactNode;}) => (
  <View style={[styles.container, {backgroundColor}]}>
    <Text style={styles.text}>
      &lt;
      {title} /&gt;
      {'\n'}
    </Text>
    {children}
  </View>
);
