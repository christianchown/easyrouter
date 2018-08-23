import React from 'react';
import {Consumer} from '../../ContextStore';

import Screen from '../../components/Screen';
import Button from '../../components/Button';

export default ({router}) => (
  <Consumer>
    {({setAuth}) => (
      <Screen backgroundColor="#155e63" title="Unauthenticated">
        <Button
          onPress={() => {
            setAuth(true);
          }}
          text="Click this to set authenticated to true"
        />
        <Button
          onPress={() => {
            router.pop();
          }}
          text="Or click this to pop()"
        />
      </Screen>
    )}
  </Consumer>
);
