import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../../Constants';
import {FONT_FAMILY} from '../../../Constants/commonStyles';
import DeviceInfo from 'react-native-device-info';

export const styles = StyleSheet.create({
  parent: {
    flexDirection: 'row',
    backgroundColor: COLORS.SECONDARY.WHITE,
    borderRadius: SIZES.rounding2,
    padding: DeviceInfo.isTablet() ? 32 : 11,
    minWidth: SIZES.width / 2.8,
    justifyContent: 'center',
  },
  child: {
    alignItems: 'center',
  },
  iconCtr: {
    alignItems: 'center',
    marginVertical: 8,
  },
  text: {
    textAlign: 'center',
    fontSize: SIZES.font14,
    fontWeight: SIZES.fontBold0,
    fontFamily: FONT_FAMILY.REGULAR,
    color: 'black',
  },
  checkboxCtr: {
    width: 8,
    position: 'absolute',
    right: 14,
    top: 14,
    alignItems: 'center',
  },
});
