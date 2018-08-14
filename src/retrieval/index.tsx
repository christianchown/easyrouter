import React from 'react';
import {Dispatch, bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import baseStyles from '../baseStyles';
import Stack from '../components/Stack';
import {StoreState} from 'store';

const styles = StyleSheet.create({
  container: {
    ...baseStyles.container,
    backgroundColor: '#233142',
  },
  button: baseStyles.button,
  text: baseStyles.text,
});

interface Props {
  retrieveAmount: number;
}

interface PropsFromDispatch {
  logout: () => void;
  forceEnd: () => void;
}

type RetrievalProps = Props & PropsFromDispatch;

const Retrieval: React.SFC<RetrievalProps> = ({retrieveAmount, logout, forceEnd}) => (
  <View style={styles.container}>
    <Text style={styles.text}>&lt;Retrieval /&gt;</Text>

    <Text style={styles.text}>{retrieveAmount}%</Text>

    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        logout();
      }}
    >
      <Text style={styles.text}>Click this to cancel</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        forceEnd();
      }}
    >
      <Text style={styles.text}>Click this to force end</Text>
    </TouchableOpacity>

    <Stack />
  </View>
);

const mapdispatchToProps = (dispatch: Dispatch): PropsFromDispatch =>
  bindActionCreators(
    {
      logout: () => ({type: 'AUTH_LOGOUT'}),
      forceEnd: () => ({type: 'AUTH_END_RETRIEVE'}),
    },
    dispatch,
  );

export default connect<{}, PropsFromDispatch, Props, StoreState>(
  null,
  mapdispatchToProps,
)(Retrieval);
