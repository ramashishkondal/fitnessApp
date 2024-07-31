import {StyleSheet} from 'react-native';
import {COLORS, FONT_FAMILY, SIZES} from '../../../Constants/commonStyles';

export const styles = StyleSheet.create({
  parent: {
    width: '80%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    borderRadius: SIZES.rounding2,
    backgroundColor: COLORS.SECONDARY.WHITE,
    justifyContent: 'center',
  },
  iconCtr: {
    flex: 1,
    marginLeft: 4,
    minWidth: 20,
    paddingHorizontal: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'red',
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'green',
    padding: 10,
    flex: 19,
    flexWrap:'nowrap',
    maxWidth: 225,
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
