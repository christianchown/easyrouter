import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {Router} from 'react-native-easy-router';
import {Dispatch, bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import baseStyles from '../baseStyles';
import animation from './animation';
import Popper from '../components/Popper';
import Stack from '../components/Stack';

const styles = StyleSheet.create({
  container: {
    ...baseStyles.container,
    backgroundColor: '#e01171',
  },
  button: baseStyles.button,
  text: baseStyles.text,
});

interface Props {
  router: Router;
  login: () => void;
}

const Login = ({router, login}: Props) => (
  <View style={styles.container}>
    <Text style={styles.text}>&lt;Login /&gt;</Text>

    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        login();
      }}
    >
      <Text style={styles.text}>Click this to login</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        router.push.NewCode({}, animation);
      }}
    >
      <Text style={styles.text}>Request a new code</Text>
    </TouchableOpacity>

    <Popper router={router} />
    <Stack />
  </View>
);

const mapdispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      login: () => ({type: 'AUTH_LOGIN'}),
    },
    dispatch,
  );

export default connect(
  null,
  mapdispatchToProps,
)(Login);
