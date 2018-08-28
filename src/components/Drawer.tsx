import React from 'react';
import {DrawerLayoutAndroidProps, Dimensions} from 'react-native';
import DrawerLayout from 'react-native-drawer-layout-polyfill';

const getWidth = () => {
  const {width, height} = Dimensions.get('screen');
  if (width > height) {
    return height;
  }
  return width;
};

interface Props {
  enabled?: boolean;
  forwardedRef?: React.Ref<DrawerLayout>;
  children: React.ReactNode;
}

interface State {
  width: number;
}

type DrawerProps = Props & DrawerLayoutAndroidProps;

class Drawer extends React.Component<DrawerProps, State> {
  constructor(props: DrawerProps) {
    super(props);
    this.state = {
      width: getWidth(),
    };
  }

  onLayout = () => {
    this.setState({width: getWidth()});
  };

  render() {
    const {forwardedRef, children, enabled, ...rest} = this.props;
    const {width} = this.state;
    return (
      <DrawerLayout
        drawerWidth={width * 0.75}
        drawerLockMode={!enabled ? 'unlocked' : 'locked-closed'}
        ref={forwardedRef}
        {...rest}
      >
        {children}
      </DrawerLayout>
    );
  }
}

export default React.forwardRef(({enabled, children, ...rest}: DrawerProps, ref?: React.Ref<DrawerLayout>) => (
  <Drawer enabled={enabled} forwardedRef={ref} {...rest}>
    {children}
  </Drawer>
));
