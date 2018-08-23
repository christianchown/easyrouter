import React from 'react';

import Screen from '../../components/Screen';
import Button from '../../components/Button';

const animation = {type: 'top', duration: 1000};

export default ({router}) => (
  <Screen backgroundColor="#1b3764" title="LoggedIn">
    <Button
      onPress={() => {
        router.push.LoggedIn2({}, animation);
      }}
      text={`Click this to push.LoggedIn2({}, ${JSON.stringify(animation)})`}
    />
  </Screen>
);
