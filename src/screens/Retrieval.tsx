import React from 'react';
import {Text} from 'react-native';
import {connect} from 'react-redux';

import Screen from '../components/Screen';
import Button from '../components/Button';
import styles from '../baseStyles';

const Retrieval = ({retrieveAmount, logout, endRetrieve}) => (
  <Screen backgroundColor="#233142" title="Retrieval">
    <Text style={styles.text}>{retrieveAmount}%</Text>
    <Button
      onPress={() => {
        logout();
      }}
      text="Click this to cancel"
    />
    <Button
      onPress={() => {
        endRetrieve();
      }}
      text="Click this to force end"
    />
  </Screen>
);

const mapDispatchToProps = ({auth: {logout, endRetrieve}}) => ({
  logout,
  endRetrieve,
});

export default connect(
  null,
  mapDispatchToProps,
)(Retrieval);
