import {StyleSheet} from 'react-native';
import {COLORS, SPACING} from '../../../Constants';

export const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY.LIGHT_GREY,
    borderRadius: 10,
  },
  flatListStyle: {
    ...SPACING.mt3,
    ...SPACING.mh1,
  },
  flatListCtr: {
    flex: 5,
    ...SPACING.mt2,
  },
  customButtonCtr: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 16,
  },
});
