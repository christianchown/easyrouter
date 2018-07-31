import React from 'react';
import {Dimensions} from 'react-native';
import DrawerLayout from 'react-native-drawer-layout-polyfill';

const {width} = Dimensions.get('screen');

const Drawer = React.forwardRef(({enabled, children, navigationView, ...rest}, ref) => (
  <DrawerLayout
    drawerWidth={width * 0.75}
    drawerLockMode={!enabled ? 'unlocked' : 'locked-closed'}
    renderNavigationView={navigationView}
    ref={ref}
    {...rest}>
    {children}
  </DrawerLayout>
));

export default Drawer;
