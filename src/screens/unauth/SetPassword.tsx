import React from 'react';
import {connect} from 'react-redux';

import Screen from '../../components/Screen';
import Button from '../../components/Button';
import {StoreState} from '../../easypeasy/index';


interface PropsFromDispatch {
  login: () => void;
}

type Props = PropsFromDispatch;

const SetPassword: React.SFC<Props> = ({login}) => (
  <Screen backgroundColor="#0f0766" title="SetPassword">
    <Button
      onPress={() => {
        login();
      }}
      text="Click this to set password"
    />
  </Screen>
);

const mapDispatchToProps = ({auth: {login}}: StoreState) => ({
  login,
});

export default connect<null, PropsFromDispatch>(
  null,
  mapDispatchToProps,
)(SetPassword);
