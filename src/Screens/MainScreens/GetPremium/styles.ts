import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../../Constants';
import {FONT_FAMILY} from '../../../Constants/commonStyles';

export const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: COLORS.SECONDARY.WHITE,
  },
  activeCarouselCtr: {
    position: 'absolute',
    width: 100,
    top: SIZES.height / 3.85,
    left: SIZES.width / 2 - 50,
  },
  childCtr: {
    flex: 3,
    marginTop: 56,
  },
  headingCtr: {
    marginTop: 32,
    height: SIZES.height / 6,
    marginHorizontal: 48,
  },
  descriptionText: {
    marginTop: 8,
  },
  premiumSelectorCtr: {
    marginHorizontal: 16,
  },
  footerCtr: {marginHorizontal: 48, marginVertical: 24},
  recurringText: {
    fontFamily: FONT_FAMILY.BOLD,
    textAlign: 'center',
    fontSize: SIZES.font9,
  },
  recurringDescriptionText: {
    fontFamily: FONT_FAMILY.REGULAR,
    textAlign: 'center',
    fontSize: SIZES.font9,
  },
  customParent: {
    alignSelf: 'center',
  },
});
