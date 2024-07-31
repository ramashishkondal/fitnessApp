import {StyleSheet} from 'react-native';
import {COLORS} from '../../../Constants/commonStyles';

export const styles = StyleSheet.create({
  logoCtr: {
    flexDirection: 'row',
  },
  logos: {
    backgroundColor: COLORS.SECONDARY.WHITE,
    borderRadius: 200,
    padding: 11,
    marginHorizontal: 10,
    minWidth: 56,
    minHeight: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
