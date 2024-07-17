import {StyleSheet} from 'react-native';
import {SIZES} from '../../../Constants';
import {COLORS, FONT_FAMILY} from '../../../Constants/commonStyles';

export const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  foodBowlCtr: {
    alignSelf: 'center',
    marginTop: 16,
  },
  headingCtr: {
    marginHorizontal: 24,
    marginVertical: 16,
  },
  headingText: {
    fontWeight: '400',
    // fontSize: SIZES.font15,
    marginBottom: 8,
  },
  descriptionText: {
    marginHorizontal: 24,
  },
  MealCtr: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 48,
  },
  foodCtr: {
    margin: 16,
  },
  customButtonParent: {
    alignSelf: 'center',
    marginVertical: 16,
  },
  customTextInputParent: {
    marginHorizontal: 16,
    marginTop: 24,
  },
  noResultText: {
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: SIZES.font12,
    color: COLORS.SECONDARY.GREY,
    marginTop: 16,
    textAlign: 'center',
  },
});
