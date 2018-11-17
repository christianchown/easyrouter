import React from 'react';

import Screen from './Screen';
import Button from './Button';
import {Router} from 'react-native-easy-router';

const animation = {type: 'right', duration: 1100};

export default ({router, logout, closeDrawer}: {router: Router; logout: () => void; closeDrawer: () => void}) => (
  <Screen backgroundColor="#5c3c10" title="Sidenav">
    <Button
      onPress={() => {
        if (router) {
          router.push.Settings({}, animation);
        }
        closeDrawer();
      }}
      text={`push.Settings({}, ${JSON.stringify(animation)})`}
    />

    <Button onPress={closeDrawer} text="Close the drawer" />

    <Button
      onPress={() => {
        logout();
      }}
      text="Set authenticated to false"
    />
  </Screen>
);
