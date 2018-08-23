import React from 'react';
import {Dimensions} from 'react-native';
import DrawerLayout from 'react-native-drawer-layout-polyfill';

const {width} = Dimensions.get('screen');

const Drawer = React.forwardRef(({children, ...rest}, ref) => (
  <DrawerLayout drawerWidth={width * 0.75} ref={ref} {...rest}>
    {children}
  </DrawerLayout>
));

export default Drawer;
