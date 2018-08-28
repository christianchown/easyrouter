import React from 'react';
import {Router} from 'react-native-easy-router';

import Screen from '../../components/Screen';
import Button from '../../components/Button';

interface Props {
  router: Router;
}

export default ({router}: Props) => (
  <Screen backgroundColor="#228c7b" title="Settings">
    <Button
      onPress={() => {
        router.pop();
      }}
      text="pop()"
    />
  </Screen>
);
