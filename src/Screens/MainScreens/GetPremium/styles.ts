import {Platform, StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../../Constants';
import {FONT_FAMILY} from '../../../Constants/commonStyles';
import {RFValue} from 'react-native-responsive-fontsize';
import DeviceInfo from 'react-native-device-info';

export const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: COLORS.SECONDARY.WHITE,
  },
  headingText: {
    fontSize: RFValue(21),
  },
  activeCarouselCtr: {
    position: 'absolute',
    width: 100,
  },
  childCtr: {
    flex: 3,
    marginTop: 8,
  },
  headingCtr: {
    marginTop: 32,
    height: SIZES.height / 7,
    marginHorizontal: 48,
  },
  descriptionText: {
    marginTop: 8,
  },
  premiumSelectorCtr: {
    marginHorizontal: 16,
  },
  footerCtr: {marginHorizontal: 48, marginBottom: 24, marginTop: 40},
  recurringText: {
    fontFamily: FONT_FAMILY.BOLD,
    textAlign: 'center',
    fontSize: SIZES.font10,
    color: 'black',
  },
  recurringDescriptionText: {
    fontFamily: FONT_FAMILY.MEDIUM,
    fontWeight: '400',
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
