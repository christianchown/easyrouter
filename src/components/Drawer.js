import React from 'react';
import {Dimensions} from 'react-native';
import DrawerLayout from 'react-native-drawer-layout-polyfill';

const getWidth = () => {
  const {width, height} = Dimensions.get('screen');
  if (width > height) {
    return height;
  }
  return width;
};

class Drawer extends React.Component {
  constructor(props) {
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

export default React.forwardRef((props, ref) => <Drawer forwardedRef={ref} {...props} />);
