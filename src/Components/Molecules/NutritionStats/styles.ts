import {StyleSheet} from 'react-native';
import {SIZES} from '../../../Constants';

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
  },
  quantityText: {fontSize: SIZES.font13, minWidth: 50, textAlign: 'right'},
  percentageText: {
    fontSize: SIZES.font13,
    minWidth: 50,
    textAlign: 'right',
    fontWeight: SIZES.fontBold0,
  },
});
