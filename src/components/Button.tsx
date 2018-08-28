import React from 'react';
import {TouchableOpacity, Text, StyleSheet, TextStyle, ViewStyle, TouchableOpacityProps} from 'react-native';
import baseStyles from '../baseStyles';

const styles = StyleSheet.create({
  button: baseStyles.button,
  text: baseStyles.text,
});

interface Props {
  onPress: () => void;
  text: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

type ButtonProps = Props & TouchableOpacityProps;

export default ({onPress, text, style, textStyle, ...rest}: ButtonProps) => (
  <TouchableOpacity style={style || styles.button} onPress={onPress} {...rest}>
    <Text style={textStyle || styles.text}>{text}</Text>
  </TouchableOpacity>
);
