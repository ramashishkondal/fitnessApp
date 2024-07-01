import {StyleSheet} from 'react-native';
import {COLORS, SIZES, SPACING} from '../../../Constants';
import {FONT_FAMILY} from '../../../Constants/commonStyles';

export const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY.LIGHT_GREY,
  },
  glassesCtr: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 40,
    rowGap: 40,
    paddingHorizontal: 30,
    justifyContent: 'flex-start',
    ...SPACING.mtMedium,
    marginBottom: 54,
  },
  titleText: {
    fontSize: SIZES.fontH5,
    fontWeight: SIZES.fontBold0,
    fontFamily: FONT_FAMILY.REGULAR,
    textAlign: 'center',
    ...SPACING.mh3,
    color: 'black',
  },
  highlightedText: {
    color: COLORS.PRIMARY.PURPLE,
  },
  bestPerformanceCtr: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderBottomWidth: 1,
    borderColor: COLORS.SECONDARY.LIGHT_GREY,
  },
  worstPerformanceCtr: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  descTitleText: {
    fontSize: SIZES.font15,
  },
  descText: {
    color: COLORS.SECONDARY.GREY,
  },
  titleAndDescContainer: {
    flex: 6,
  },
  valueText: {
    fontSize: SIZES.font15,
    flex: 1,
    textAlign: 'right',
  },
  iconCtr: {justifyContent: 'center', flex: 1},
});
