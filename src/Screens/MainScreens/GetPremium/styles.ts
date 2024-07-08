import {Platform, StyleSheet} from 'react-native';
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
    top: Platform.OS === 'ios' ? SIZES.height / 4.25 : SIZES.height / 4.75,
    left: SIZES.width / 2 - 50,
  },
  childCtr: {
    flex: 3,
    marginTop: 8,
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
    color: 'black',
  },
  recurringDescriptionText: {
    fontFamily: FONT_FAMILY.REGULAR,
    textAlign: 'center',
    fontSize: SIZES.font9,
    color: 'black',
  },
  customParent: {
    alignSelf: 'center',
    marginBottom: 16,
  },
  imageCtr: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    flex: 1,
  },
});
