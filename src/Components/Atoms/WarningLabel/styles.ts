import {StyleSheet} from 'react-native';
import {SIZES} from '../../../Constants';
import {FONT_FAMILY} from '../../../Constants/commonStyles';
import DeviceInfo from 'react-native-device-info';
import {RFValue} from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
  parent: {
    paddingVertical: 20,
    backgroundColor: '#F4DCDC',
  },
  warningText: {
    color: '#F57D7D',
    fontWeight: SIZES.fontBold0,
    fontSize: DeviceInfo.isTablet() ? RFValue(12.5) : RFValue(13.5),
    textAlign: 'center',
    fontFamily: FONT_FAMILY.REGULAR,
  },
  touchableParent: {
    flex: 1,
  },
});
