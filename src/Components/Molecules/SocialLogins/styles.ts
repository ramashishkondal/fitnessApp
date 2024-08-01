import {StyleSheet} from 'react-native';
import {COLORS} from '../../../Constants/commonStyles';
import DeviceInfo from 'react-native-device-info';

export const styles = StyleSheet.create({
  logoCtr: {
    flexDirection: 'row',
  },
  logos: {
    backgroundColor: COLORS.SECONDARY.WHITE,
    borderRadius: 200,
    padding: 11,
    marginHorizontal: 10,
    minWidth: DeviceInfo.isTablet() ? 56 : undefined,
    minHeight: DeviceInfo.isTablet() ? 56 : undefined,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
