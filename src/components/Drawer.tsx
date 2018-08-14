import React from 'react';
import {DrawerLayoutAndroidProps, Dimensions} from 'react-native';
import DrawerLayout from 'react-native-drawer-layout-polyfill';

const {width} = Dimensions.get('screen');

interface Props {
  enabled?: boolean;
  children: React.ReactNode;
}

type DrawerProps = Props & DrawerLayoutAndroidProps;

const Drawer = React.forwardRef(({enabled, children, ...rest}: DrawerProps, ref?: React.Ref<DrawerLayout>) => (
  <DrawerLayout drawerWidth={width * 0.75} drawerLockMode={!enabled ? 'unlocked' : 'locked-closed'} ref={ref} {...rest}>
    {children}
  </DrawerLayout>
));

export default Drawer;
