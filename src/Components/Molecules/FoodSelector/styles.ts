import {StyleSheet} from 'react-native';
import {COLORS} from '../../../Constants';
import {FONT_FAMILY, SIZES} from '../../../Constants/commonStyles';

export const styles = StyleSheet.create({
  parent: {
    flexDirection: 'row',
    paddingBottom: 8,
    paddingTop: 20,
    borderBottomWidth: 1,
    borderColor: COLORS.SECONDARY.LIGHT_GREY,
  },
  foodNameCtr: {
    flex: 1,
    marginLeft: 8,
  },
  foodNameText: {
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: SIZES.font12,
    color: 'black',
  },
  bouncyCheckbox: {
    height: 25,
  },
});
