import React from 'react';

import Screen from '../../components/Screen';
import Button from '../../components/Button';
import animation from './animation';

export default ({router}) => (
  <Screen backgroundColor="#59057b" title="CodeOrLogin">
    <Button
      onPress={() => {
        router.push.CodeEntry({}, animation);
      }}
      text="Click here if you have a code"
    />
    <Button
      onPress={() => {
        router.push.Login({}, animation);
      }}
      text="Click here if you already have a login"
    />
  </Screen>
);