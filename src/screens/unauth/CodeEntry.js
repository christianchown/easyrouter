import React from 'react';

import Screen from '../../components/Screen';
import Button from '../../components/Button';
import animation from './animation';

export default ({router}) => (
  <Screen backgroundColor="#de5b7b" title="CodeEntry">
    <Button
      onPress={() => {
        router.push.SetPassword({}, animation);
      }}
      text="Click to enter a valid code"
    />
    <Button
      onPress={() => {
        router.push.NewCode({}, animation);
      }}
      text="Click to request a new code"
    />
    <Button
      onPress={() => {
        router.pop();
      }}
      text="Click to go back"
    />
  </Screen>
);
