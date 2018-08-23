import React from 'react';

import Screen from '../../components/Screen';
import Button from '../../components/Button';

export default ({router}) => (
  <Screen backgroundColor="#59057b" title="LoggedIn2">
    <Button
      onPress={() => {
        router.pop();
      }}
      text="Click this to pop()"
    />
  </Screen>
);
