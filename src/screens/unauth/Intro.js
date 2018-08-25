import React from 'react';

import Screen from '../../components/Screen';
import Button from '../../components/Button';

const animation = {type: 'fade', duration: 1200};

export default ({router}) => (
  <Screen backgroundColor="#59057b" title="Intro">
    <Button
      onPress={() => {
        router.push.Login({}, animation);
      }}
      text={`push.Login({}, ${JSON.stringify(animation)})`}
    />
  </Screen>
);
