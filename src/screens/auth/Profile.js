import React from 'react';

import Screen from '../../components/Screen';
import Button from '../../components/Button';

const animation = {type: 'bottom', duration: 500};

export default ({router}) => (
  <Screen backgroundColor="#5f1854" title="Profile">
    <Button
      onPress={() => {
        router.push.Settings({}, animation);
      }}
      text={`push.Settings({}, ${JSON.stringify(animation)})`}
    />
    <Button
      onPress={() => {
        router.pop();
      }}
      text="pop()"
    />
  </Screen>
);
