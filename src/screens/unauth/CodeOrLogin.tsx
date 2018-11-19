import React from 'react';
import { Router } from 'react-native-easy-router';
import { Text } from 'react-native';
import { useStore, useAction } from 'easy-peasy';

import Screen from '../../components/Screen';
import Button from '../../components/Button';
import animation from './animation';
import { RouterStackValues } from 'easypeasy/router';
import { StoreState, StoreReducers } from 'easypeasy';

export default function CodeOrLogin({ router }: { router: Router }) {
  const routerStack = useStore<Array<RouterStackValues>, StoreState, StoreReducers>(state => state.router.stack);
  const dispatchLogout = useAction<() => void, StoreState, StoreReducers>(dispatch => dispatch.auth.logout);
  return (
    <Screen backgroundColor="#59057b" title="CodeOrLogin">
      <Text>{routerStack}</Text>
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
}
