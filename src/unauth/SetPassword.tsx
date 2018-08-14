import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {Dispatch, bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import baseStyles from '../baseStyles';
import Stack from '../components/Stack';

const styles = StyleSheet.create({
  container: {
    ...baseStyles.container,
    backgroundColor: '#0f0766',
  },
  button: baseStyles.button,
  text: baseStyles.text,
});

const SetPassword = ({login}: {login: () => void}) => (
  <View style={styles.container}>
    <Text style={styles.text}>&lt;SetPassword /&gt;</Text>

    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        login();
      }}
    >
      <Text style={styles.text}>Click this to set password</Text>
    </TouchableOpacity>

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
)(SetPassword);
