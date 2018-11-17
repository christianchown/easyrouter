import React from 'react';
import {TouchableOpacity, TouchableOpacityProps, Text, ViewStyle, TextStyle} from 'react-native';
import styles from '../baseStyles';

interface Props extends TouchableOpacityProps {
  onPress: () => void;
  text: string;
  style?: ViewStyle,
  textStyle?: TextStyle
}

const Button: React.SFC<Props> = ({onPress, text, style, textStyle, ...rest}) => (
  <TouchableOpacity style={style || styles.button} onPress={onPress} {...rest}>
    <Text style={textStyle || styles.text}>{text}</Text>
  </TouchableOpacity>
);

export default Button;