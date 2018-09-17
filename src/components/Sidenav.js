import React from 'react';

import Screen from './Screen';
import Button from './Button';

const animation = {type: 'right', duration: 1100};

export default ({router, setAuth, closeDrawer}) => (
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
      text="Set authenticated to false"
    />
  </Screen>
);
