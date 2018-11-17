import React from 'react';

import Screen from '../../components/Screen';
import Button from '../../components/Button';

export default ({router}) => (
  <Screen backgroundColor="#757882" title="NewCode">
    <Button
      onPress={() => {
        router.pop();
      }}
      text="Click to go back"
    />
  </Screen>
);
