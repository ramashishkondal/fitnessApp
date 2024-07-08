import {StyleSheet} from 'react-native';
import {COLORS, FONT_FAMILY, SIZES} from '../../../Constants/commonStyles';

export const styles = StyleSheet.create({
  parent: {
    flexDirection: 'row',
    // height: 42,
    borderRadius: SIZES.rounding2,
    backgroundColor: COLORS.SECONDARY.WHITE,
  },
  iconCtr: {
    flex: 1,
    marginLeft: 4,
    minWidth: 20,
    paddingHorizontal: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    padding: 10,
    flex: 19,
    flexDirection: 'row',
    paddingHorizontal: 15,
    fontSize: SIZES.font13,
    fontFamily: FONT_FAMILY.MEDIUM,
    color: 'black',
  },
  parentError: {
    borderWidth: 0.5,
    borderColor: COLORS.SECONDARY.RED,
  },
  parentFocused: {
    borderWidth: 0.5,
    borderColor: COLORS.PRIMARY.PURPLE,
  },
});
