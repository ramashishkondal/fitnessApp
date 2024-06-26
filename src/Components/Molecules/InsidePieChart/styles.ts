import {StyleSheet} from 'react-native';
import {SIZES} from '../../../Constants';
import {FONT_FAMILY} from '../../../Constants/commonStyles';

export const styles = StyleSheet.create({
  parent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 32,
    fontWeight: SIZES.fontBold0,
    fontFamily: FONT_FAMILY.REGULAR,
    color: 'black',
  },
  dailyGoalText: {
    fontSize: 16,
    fontWeight: SIZES.fontBold2,
    marginTop: 4,
    fontFamily: FONT_FAMILY.REGULAR,
    color: 'black',
  },
});
