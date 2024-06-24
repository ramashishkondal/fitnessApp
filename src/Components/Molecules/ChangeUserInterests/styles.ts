import {StyleSheet} from 'react-native';
import {COLORS, SPACING} from '../../../Constants';

export const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY.LIGHT_GREY,
  },
  flatListStyle: {
    ...SPACING.mt3,
    ...SPACING.mh1,
  },
});
