import {StyleSheet} from 'react-native';
import {SIZES} from '../../../Constants';
import {FONT_FAMILY} from '../../../Constants/commonStyles';

export const styles = StyleSheet.create({
  parent: {
    paddingVertical: 20,
    backgroundColor: '#F4DCDC',
  },
  warningText: {
    color: '#F57D7D',
    fontWeight: SIZES.fontBold0,
    fontSize: SIZES.font12,
    textAlign: 'center',
    fontFamily: FONT_FAMILY.REGULAR,
  },
  touchableParent: {
    flex: 1,
  },
});
