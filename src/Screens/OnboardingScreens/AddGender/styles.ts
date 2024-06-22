import {StyleSheet} from 'react-native';
import {COLORS, SIZES, SPACING} from '../../../Constants';

export const styles = StyleSheet.create({
  parent: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY.GREY,
    paddingHorizontal: 38,
  },
  genderCtr: {
    flexDirection: 'row',
  },
  genderCardsCtr: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  descriptionText: {
    textAlign: 'center',
    marginHorizontal: 30,
    fontSize: SIZES.font13,
    fontWeight: SIZES.fontBold2,
    color: '#AFB1C7',
    ...SPACING.mtMedium,
  },
});
