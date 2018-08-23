import React from 'react';

import Screen from '../../components/Screen';
import Button from '../../components/Button';

const animation = {type: 'fade', duration: 1200};

const Intro = ({router}) => (
  <Screen backgroundColor="#59057b" title="Intro">
    <Button
      onPress={() => {
        router.push.Unauthenticated({}, animation);
      }}
      text={`Click this to push.Unauthenticated({}, ${JSON.stringify(animation)})`}
    />
  </Screen>
);

export default Intro;
