import {RFValue} from 'react-native-responsive-fontsize';
import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../../Constants';
import {FONT_FAMILY} from '../../../Constants/commonStyles';
import DeviceInfo from 'react-native-device-info';

export const styles = StyleSheet.create({
  parent: {
    right: RFValue(10),
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  image: {
    width: DeviceInfo.isTablet() ? 90 : 60,
    height: DeviceInfo.isTablet() ? 90 : 60,
    borderRadius: 200,
  },
  notificationCtr: {
    position: 'absolute',
    backgroundColor: COLORS.PRIMARY.PURPLE,
    borderRadius: 200,
    justifyContent: 'center',
    bottom: -4,
    right: -4,
    width: 30,
    height: 30,
  },
  notificationText: {
    alignSelf: 'center',
    color: COLORS.SECONDARY.WHITE,
    fontWeight: SIZES.fontBold0,
    fontSize: SIZES.font12,
    fontFamily: FONT_FAMILY.REGULAR,
  },
  onlineStatus: {
    position: 'absolute',
    backgroundColor: COLORS.SECONDARY.CYAN,
    borderRadius: 200,
    justifyContent: 'center',
    bottom: 4,
    left: DeviceInfo.isTablet() ? 6 : 4,
    width: DeviceInfo.isTablet() ? 16 : 12,
    height: DeviceInfo.isTablet() ? 16 : 12,
  },
  onlineStatusNoInternet: {
    backgroundColor: COLORS.SECONDARY.RED,
  },
});
