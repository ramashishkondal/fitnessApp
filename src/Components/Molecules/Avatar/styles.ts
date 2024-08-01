import {StyleSheet} from 'react-native';
import {COLORS} from '../../../Constants/commonStyles';
import DeviceInfo from 'react-native-device-info';

export const styles = StyleSheet.create({
  avatarCtr: {
    borderColor: COLORS.PRIMARY.GREY,
    borderWidth: 5,
    marginHorizontal: 10,
    borderRadius: 200,
  },
  avatarSelected: {
    borderColor: COLORS.PRIMARY.PURPLE,
    borderWidth: 5,
    borderRadius: 200,
  },
  parent: {
    minWidth: 100,
    marginHorizontal: 12,
  },
  image: {
    width: DeviceInfo.isTablet() ? 160 : 80,
    height: DeviceInfo.isTablet() ? 160 : 80,
    borderRadius: 200,
  },
});
