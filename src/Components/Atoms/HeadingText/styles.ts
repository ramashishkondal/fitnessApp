import {StyleSheet} from 'react-native';
import {SIZES} from '../../../Constants';
import {FONT_FAMILY} from '../../../Constants/commonStyles';

export const styles = StyleSheet.create({
  text1: {
    fontSize: SIZES.fontH5,
    textAlign: 'center',
    fontFamily: FONT_FAMILY.BOLD,
    color: 'black',
  },
  text2: {
    fontSize: SIZES.fontH4,
    fontFamily: FONT_FAMILY.BOLD,
    color: 'black',
  },
});
