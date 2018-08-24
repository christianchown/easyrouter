import React from 'react';

import Screen from '../../components/Screen';
import Button from '../../components/Button';

export default ({router}) => (
  <Screen backgroundColor="#228c7b" title="Settings">
    <Button
      onPress={() => {
        router.pop();
      }}
      text="pop()"
    />
  </Screen>
);
