import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  parent: {
    // borderWidth: 1,
  },
  glassEmpty: {
    width: 50,
    height: 50,
    backgroundColor: 'red',
    transform: [{skewX: '20deg'}],
  },
  plusCtr: {
    position: 'absolute',
    left: '30%',
    top: '30%',
  },
});
