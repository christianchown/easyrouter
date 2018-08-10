import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import baseStyles from '../baseStyles';

const styles = StyleSheet.create({
  container: {
    ...baseStyles.container,
    backgroundColor: '#233142',
  },
  button: baseStyles.button,
  text: baseStyles.text,
});

const Retrieval = ({retrieveAmount, logout}) => (
  <View style={styles.container}>
    <Text style={styles.text}>&lt;Retrieval /&gt;</Text>

    <Text style={styles.text}>{retrieveAmount}%</Text>

    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        logout();
      }}>
      <Text style={styles.text}>Click this to cancel</Text>
    </TouchableOpacity>
  </View>
);

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      logout: () => ({type: 'AUTH_LOGOUT'}),
    },
    dispatch,
  );

export default connect(
  null,
  mapDispatchToProps,
)(Retrieval);
