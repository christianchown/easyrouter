import React from 'react';

import Screen from '../components/Screen';
import Button from '../components/Button';

const animation = {type: 'right', duration: 1100};

export default ({router, setAuth, closeDrawer}) => (
  <Screen backgroundColor="#5c3c10" title="Sidenav">
    <Button
      onPress={() => {
        if (router) {
          router.push.LoggedIn2({}, animation);
        }
        closeDrawer();
      }}
      text={`Click this to push.LoggedIn2({}, ${JSON.stringify(animation)})`}
    />

    <Button
      onPress={() => {
        closeDrawer();
      }}
      text="Close the drawer"
    />

    <Button
      onPress={() => {
        setAuth(false);
      }}
      text="Or set authenticated to false"
    />
  </Screen>
);
