import {StyleSheet} from 'react-native';
import {COLORS, FONT_FAMILY, SIZES} from '../../../Constants/commonStyles';
import {RFValue} from 'react-native-responsive-fontsize';
import DeviceInfo from 'react-native-device-info';

export const styles = StyleSheet.create({
  parent: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY.PURPLE,
    // paddingHorizontal: 104,
    // paddingVertical: 14,
    height: DeviceInfo.isTablet() ? 80 : RFValue(44),
    width: DeviceInfo.isTablet() ? 500 : RFValue(260),

    borderRadius: DeviceInfo.isTablet() ? 40 : SIZES.rounding3,
  },
  buttonCtr: {},
  text: {
    color: COLORS.SECONDARY.WHITE,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    fontSize: SIZES.fontH6,
    fontWeight: SIZES.fontBold0,
  },
});
