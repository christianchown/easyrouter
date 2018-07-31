import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eccfd1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 20,
    backgroundColor: 'rgba(0,0,0,.4)',
    padding: 10,
    marginBottom: 20,
  },
  text: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
});

const animation = {type: 'right'};

const Sidenav = ({router, setAuth, closeDrawer}) => (
  <View style={styles.container}>
    <Text style={styles.text}>
      This is the sidebar.
      {'\n'}
      It has a light pink background.
    </Text>

    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        if (router) {
          router.push.LoggedIn2({}, animation);
        }
        closeDrawer();
      }}>
      <Text style={styles.text}>
        Click this text to push.LoggedIn2({'{}'}, {JSON.stringify(animation)})
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        setAuth(false);
      }}>
      <Text style={styles.text}>Click this to de-authenticate</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        closeDrawer();
      }}>
      <Text style={styles.text}>Or click this to close the drawer</Text>
    </TouchableOpacity>
  </View>
);

export default Sidenav;
