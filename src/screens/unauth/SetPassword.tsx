import React from 'react';
import {Dispatch, bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Screen from '../../components/Screen';
import Button from '../../components/Button';

const SetPassword = ({login}: {login: () => void}) => (
  <Screen backgroundColor="#0f0766" title="SetPassword">
    <Button
      onPress={() => {
        login();
      }}
      text="Set password"
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
)(SetPassword);
