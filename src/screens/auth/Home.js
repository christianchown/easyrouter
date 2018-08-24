import React from 'react';

import Screen from '../../components/Screen';
import Button from '../../components/Button';

const animation = {type: 'top', duration: 1000};

export default ({router}) => (
  <Screen backgroundColor="#1b3764" title="Home">
    <Button
      onPress={() => {
        router.push.Profile({}, animation);
      }}
      text={`push.Profile({}, ${JSON.stringify(animation)})`}
    />
  </Screen>
);
