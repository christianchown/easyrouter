import React from 'react';
import {connect} from 'react-redux';

import Screen from '../../components/Screen';
import Button from '../../components/Button';
import animation from './animation';

const Login = ({router, login}) => (
  <Screen backgroundColor="#e01171" title="Login">
    <Button
      onPress={() => {
        login();
      }}
      text="Click here to login"
    />
    <Button
      onPress={() => {
        router.push.NewCode({}, animation);
      }}
      text="Request a new code"
    />
  </Screen>
);

const mapDispatchToProps = ({auth: {login}}) => ({
  login,
});

export default connect(
  null,
  mapDispatchToProps,
)(Login);
