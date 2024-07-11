import {StyleSheet} from 'react-native';
import {SIZES} from '../../../Constants';
import {FONT_FAMILY} from '../../../Constants/commonStyles';

export const styles = StyleSheet.create({
  text1: {
    fontSize: SIZES.fontH4,
    textAlign: 'center',
    fontFamily: FONT_FAMILY.EXTRA_BOLD,
    fontWeight: '800',
    color: '#2D3142',
  },
  text2: {
    fontSize: SIZES.fontH4,
    fontFamily: FONT_FAMILY.BOLD,
    color: 'black',
  },
});
