import React from 'react';
import {Router} from 'react-native-easy-router';

import Screen from '../../components/Screen';
import Button from '../../components/Button';

const animation = {type: 'bottom', duration: 500};

interface Props {
  router: Router;
}

export default ({router}: Props) => (
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
