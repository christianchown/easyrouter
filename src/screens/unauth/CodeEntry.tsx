import React from 'react';
import {Router} from 'react-native-easy-router';

import Screen from '../../components/Screen';
import Button from '../../components/Button';
import animation from './animation';

interface Props {
  router: Router;
}

export default ({router}: Props) => (
  <Screen backgroundColor="#de5b7b" title="CodeEntry">
    <Button
      onPress={() => {
        router.push.SetPassword({}, animation);
      }}
      text="Enter a valid code"
    />
    <Button
      onPress={() => {
        router.push.NewCode({}, animation);
      }}
      text="Request a new code"
    />
  </Screen>
);
