import React from 'react';
import {Router} from 'react-native-easy-router';
import Screen from '../components/Screen';
import Button from '../components/Button';

const animation = {type: 'right', duration: 1100};

interface Props {
  router: Router;
  logout: () => void;
  closeDrawer: () => void;
}

export default ({router, logout, closeDrawer}: Props) => (
  <Screen backgroundColor="#5c3c10" title="Sidenav">
    <Button
      onPress={() => {
        if (router) {
          router.push.Profile({}, animation);
        }
        closeDrawer();
      }}
      text={`push.Profile({}, ${JSON.stringify(animation)})`}
    />

    <Button onPress={closeDrawer} text="Close the drawer" />

    <Button onPress={logout} text="Set authenticated to false" />
  </Screen>
);
