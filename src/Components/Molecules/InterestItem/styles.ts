import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../../Constants';
import {FONT_FAMILY} from '../../../Constants/commonStyles';
import DeviceInfo from 'react-native-device-info';

export const styles = StyleSheet.create({
  parent: {
    flex: 1,
    padding: DeviceInfo.isTablet() ? 16 : 0,
  },
  child: {
    flex: 1,
    borderRadius: 200,
    alignItems: 'center',
    paddingTop: 7,
  },
  iconCtr: {
    borderRadius: 200,
    padding: 20,
    backgroundColor: COLORS.SECONDARY.WHITE,
  },
  iconCtrSelected: {
    backgroundColor: COLORS.PRIMARY.PURPLE,
  },
  textCtr: {
    marginVertical: 20,
  },
  text: {
    fontSize: SIZES.font12,
    color: 'black',
    fontFamily: FONT_FAMILY.MEDIUM,
  },
});
