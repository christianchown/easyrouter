import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styles from './styles';

export default ({onPress, text, style, ...rest}) => (
  <TouchableOpacity style={style || styles.button} onPress={onPress} {...rest}>
    <Text style={styles.text}>{text}</Text>
  </TouchableOpacity>
);
