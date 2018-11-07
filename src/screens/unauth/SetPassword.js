import React from 'react';
import {connect} from 'react-redux';

import Screen from '../../components/Screen';
import Button from '../../components/Button';

const SetPassword = ({login}) => (
  <Screen backgroundColor="#0f0766" title="SetPassword">
    <Button
      onPress={() => {
        login();
      }}
      text="Click this to set password"
    />
  </Screen>
);

const mapDispatchToProps = ({auth: {login}}) => ({
  login,
});

export default connect(
  null,
  mapDispatchToProps,
)(SetPassword);
