import {StyleSheet} from 'react-native';
import {SIZES} from '../../../Constants';
import {FONT_FAMILY} from '../../../Constants/commonStyles';

export const styles = StyleSheet.create({
  parent: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 20,
  },
  titleCtr: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorCtr: {
    width: 18,
    height: 18,
    borderRadius: SIZES.rounding0,
  },
  titleText: {
    paddingHorizontal: 8,
    fontSize: SIZES.font13,
    minWidth: 120,
    fontFamily: FONT_FAMILY.REGULAR,
    color: 'black',
  },
  quantityText: {
    fontSize: SIZES.font13,
    minWidth: 50,
    textAlign: 'right',
    color: 'black',
    fontFamily: FONT_FAMILY.REGULAR,
  },
  percentageText: {
    fontSize: SIZES.font13,
    minWidth: 50,
    textAlign: 'right',
    fontWeight: SIZES.fontBold0,
    color: 'black',
    fontFamily: FONT_FAMILY.REGULAR,
  },
});
