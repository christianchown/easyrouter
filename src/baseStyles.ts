import { ViewStyle, TextStyle } from 'react-native';

const styles: {
  container: ViewStyle;
  button: ViewStyle;
  text: TextStyle;
} = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'rgba(0,0,0,.4)',
    padding: 10,
    margin: 20,
    marginBottom: 0,
  },
  text: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
};

export default styles;
