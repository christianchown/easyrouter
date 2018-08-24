import React from 'react';
import {Consumer} from '../../ContextStore';

import Screen from '../../components/Screen';
import Button from '../../components/Button';

export default ({router}) => (
  <Consumer>
    {({setAuth}) => (
      <Screen backgroundColor="#155e63" title="Login">
        <Button
          onPress={() => {
            setAuth(true);
          }}
          text="Set authenticated to true"
        />
        <Button
          onPress={() => {
            router.pop();
          }}
          text="pop()"
        />
      </Screen>
    )}
  </Consumer>
);
