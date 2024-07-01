import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../../Constants/commonStyles';

export const styles = StyleSheet.create({
  parent: {
    paddingHorizontal: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    maxWidth: 450,
  },
  text: {
    fontSize: SIZES.font14,
  },
  customButtonParent: {
    marginTop: 78,
  },
  forgotPasswordText: {
    color: COLORS.PRIMARY.PURPLE,
    textAlign: 'right',
  },
});
