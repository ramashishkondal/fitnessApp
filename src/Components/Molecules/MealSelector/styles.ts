import {StyleSheet} from 'react-native';
import {SIZES} from '../../../Constants';
import {FONT_FAMILY} from '../../../Constants/commonStyles';

export const styles = StyleSheet.create({
  parent: {
    alignItems: 'center',
  },
  titleText: {
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: SIZES.font12,
    marginVertical: 4,
    color: 'black',
  },
});
