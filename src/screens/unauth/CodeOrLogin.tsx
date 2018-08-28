import React from 'react';
import {Router} from 'react-native-easy-router';

import Screen from '../../components/Screen';
import Button from '../../components/Button';
import animation from './animation';

interface Props {
  router: Router;
}

export default ({router}: Props) => (
  <Screen backgroundColor="#59057b" title="CodeOrLogin">
    <Button
      onPress={() => {
        router.push.CodeEntry({}, animation);
      }}
      text="I have a code"
    />
    <Button
      onPress={() => {
        router.push.Login({}, animation);
      }}
      text="I have a login"
    />
  </Screen>
);
