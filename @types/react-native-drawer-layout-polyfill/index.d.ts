// Type definitions for react-native-drawer-layout-polyfill

import * as React from 'react';
import {DrawerLayoutAndroidProperties, DrawerPosition} from 'react-native';

declare class ReactNativeDrawerLayoutPolyfill extends React.Component<DrawerLayoutAndroidProperties> {
  positions: DrawerPosition;
  openDrawer(): void;
  closeDrawer(): void;
}

export default ReactNativeDrawerLayoutPolyfill;
