import {StyleSheet} from 'react-native';
import {SIZES} from '../../../Constants';
import DeviceInfo from 'react-native-device-info';

export const styles = StyleSheet.create({
  parent: {
    flexDirection: 'row',
    paddingVertical: 15,
    alignItems: 'center',
  },
  colorCtr: {
    borderRadius: 100,
    width: DeviceInfo.isTablet() ? 18 : 15,
    height: DeviceInfo.isTablet() ? 18 : 15,
  },
  text: {
    paddingHorizontal: DeviceInfo.isTablet() ? 12 : 5,
    color: '#C0BBFC',
    fontSize: DeviceInfo.isTablet() ? SIZES.font12 : SIZES.font11,
    fontWeight: SIZES.fontBold1,
  },
});
