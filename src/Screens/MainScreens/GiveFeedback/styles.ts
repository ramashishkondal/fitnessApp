import {StyleSheet} from 'react-native';
import {COLORS, SIZES, SPACING} from '../../../Constants';

export const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY.GREY,
  },
  child: {
    flex: 1,
    alignItems: 'center',
  },
  titleText: {
    fontSize: SIZES.fontH5,
    fontWeight: SIZES.fontBold1,
  },
  textInputParent: {
    height: SIZES.height / 8,
    alignItems: 'flex-start',
    ...SPACING.mh2,
    ...SPACING.mt5,
  },
});
