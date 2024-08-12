import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../../Constants';
import {RFValue} from 'react-native-responsive-fontsize';
import {FONT_FAMILY} from '../../../Constants/commonStyles';
import DeviceInfo from 'react-native-device-info';
export const styles = StyleSheet.create({
  parent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  leftCtr: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: COLORS.SECONDARY.GREY,
    alignItems: DeviceInfo.isTablet() ? 'center' : 'flex-start',
  },
  rightCtr: {
    flex: 1,
    alignItems: DeviceInfo.isTablet() ? 'center' : 'flex-end',
  },
  textCtrLeft: {
    marginLeft: 32,
  },
  textCtrRight: {
    marginRight: 32,
  },
  mainInfoText: {
    fontSize: SIZES.font17,
    fontWeight: SIZES.fontBold2,
    fontFamily: FONT_FAMILY.MEDIUM,
    color: 'black',
    // borderWidth: 1,
    textAlign: 'center',
  },
  descriptionText: {
    color: COLORS.SECONDARY.GREY,
    fontWeight: SIZES.fontBold2,
    fontSize: RFValue(11.5),
    fontFamily: FONT_FAMILY.MEDIUM,
    textAlign: 'center',
  },
});
