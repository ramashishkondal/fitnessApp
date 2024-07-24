import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../../Constants';
import {FONT_FAMILY} from '../../../Constants/commonStyles';

export const styles = StyleSheet.create({
  performanceCtr: {
    paddingHorizontal: 24,
    backgroundColor: COLORS.SECONDARY.WHITE,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderBottomWidth: 1,
    borderColor: COLORS.SECONDARY.LIGHT_GREY,
  },
  iconCtr: {justifyContent: 'center', paddingRight: 24},
  titleAndDescContainer: {
    flex: 0.7,
  },
  descTitleText: {
    fontSize: SIZES.font15,
    fontFamily: FONT_FAMILY.REGULAR,
    color: 'black',
  },
  descText: {
    color: COLORS.SECONDARY.GREY,
    fontSize: SIZES.font12,
    fontWeight: SIZES.fontBold2,
    fontFamily: FONT_FAMILY.REGULAR,
  },
  valueText: {
    fontSize: SIZES.font15,
    fontFamily: FONT_FAMILY.REGULAR,
    color: 'black',
    flex: 0.3,
    textAlign: 'right',
  },
});
