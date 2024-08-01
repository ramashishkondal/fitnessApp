import {FONT_FAMILY} from './../../../Constants/commonStyles';
import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../../Constants/commonStyles';
import DeviceInfo from 'react-native-device-info';

export const styles = StyleSheet.create({
  parent: {
    paddingHorizontal: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  absolute: {
    position: 'absolute',
    width: SIZES.width,
    height: '100%',
    zIndex: 10,
    backgroundColor: COLORS.PRIMARY.GREY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    maxWidth: DeviceInfo.isTablet() ? 580 : 450,
  },
  text: {
    fontSize: SIZES.font14,
    color: 'black',
    fontFamily: FONT_FAMILY.MEDIUM,
  },
  customButtonParent: {
    marginTop: 78,
    marginBottom: 16,
  },
  forgotPasswordText: {
    color: COLORS.PRIMARY.PURPLE,
    textAlign: 'left',
  },
  forgotPasswordCtr: {
    marginTop: 16,
    flex: 1,
    width: '100%',
    alignItems: 'flex-end',
    marginRight: DeviceInfo.isTablet() ? 180 : 0,
  },
});
