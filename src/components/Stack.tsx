import React from 'react';
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Route, StoreState} from '../store';

const styles = StyleSheet.create({
  container: {
    height: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 10,
    marginTop: 20,
  },
  text: {
    color: '#DADADA',
    fontSize: 13,
    textAlign: 'left',
  },
  scroll: {
    flex: 1,
  },
});

interface PropsFromState {
  stack: Array<Route>;
}

type StackProps = PropsFromState;

const Stack: React.SFC<StackProps> = ({stack}) => (
  <View style={styles.container}>
    <ScrollView style={styles.scroll}>
      {stack.map((route, i) => (
        <Text key={route.id}>
          {i + 1}. {route.route} {JSON.stringify(route.params)}
        </Text>
      ))}
    </ScrollView>
  </View>
);

const mapStateToProps = ({router}: StoreState) => ({
  stack: router.stack,
});

export default connect<PropsFromState, {}, {}, StoreState>(mapStateToProps)(Stack);
