import React from 'react';
import {Dimensions, DrawerLayoutAndroidProps} from 'react-native';
import DrawerLayout from 'react-native-drawer-layout-polyfill';

const getWidth = () => {
  const {width, height} = Dimensions.get('screen');
  if (width > height) {
    return height;
  }
  return width;
};

interface OwnProps {
  enabled?: boolean;
  forwardedRef?: React.Ref<DrawerLayout>;
  children: React.ReactNode;
}

type Props = DrawerLayoutAndroidProps & OwnProps;

interface State {
  width: number;
}

class Drawer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      width: getWidth(),
    };
  }

  onLayout = () => {
    this.setState({width: getWidth()});
  };

  render() {
    const {forwardedRef, children, ...rest} = this.props;
    const {width} = this.state;
    return (
      <DrawerLayout drawerWidth={width * 0.75} ref={forwardedRef} {...rest}>
        {children}
      </DrawerLayout>
    );
  }
}

export default React.forwardRef(({enabled, children, ...rest}: Props, ref?: React.Ref<DrawerLayout>) => (
  <Drawer enabled={enabled} forwardedRef={ref} {...rest}>
    {children}
  </Drawer>
));