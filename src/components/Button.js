import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styles from '../baseStyles';

export default ({onPress, text, style, textStyle, ...rest}) => (
  <TouchableOpacity style={style || styles.button} onPress={onPress} {...rest}>
    <Text style={textStyle || styles.text}>{text}</Text>
  </TouchableOpacity>
);
