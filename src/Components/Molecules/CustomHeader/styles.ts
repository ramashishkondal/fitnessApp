import {StyleSheet} from 'react-native';
import {COLORS} from '../../../Constants/commonStyles';

export const styles = StyleSheet.create({
  parent: {
    backgroundColor: COLORS.PRIMARY.GREY,
    zIndex: 0,
  },
  Container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backCtr: {
    position: 'absolute',
    zIndex: 1,
    padding: 15,
    justifyContent: 'center',
    alignContent: 'center',
    left: '4%',
  },
  logoCtr: {flex: 1, alignItems: 'center'},
});
