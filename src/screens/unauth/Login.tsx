import React from 'react';
import {Router} from 'react-native-easy-router';
import {Dispatch, bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import animation from './animation';
import Screen from '../../components/Screen';
import Button from '../../components/Button';

interface Props {
  router: Router;
  login: () => void;
}

const Login = ({router, login}: Props) => (
  <Screen backgroundColor="#e01171" title="Login">
    <Button
      onPress={() => {
        login();
      }}
      text="Login"
    />

    <Button
      onPress={() => {
        router.push.NewCode({}, animation);
      }}
      text="Request a new code"
    />

    <Button
      onPress={() => {
        router.pop();
      }}
      text="pop()"
    />
  </Screen>
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
