import {StyleSheet} from 'react-native';
import {COLORS, SIZES, SPACING} from '../../../Constants';
import {RFValue} from 'react-native-responsive-fontsize';
import {FONT_FAMILY} from '../../../Constants/commonStyles';

export const styles = StyleSheet.create({
  parent: {
    backgroundColor: COLORS.SECONDARY.WHITE,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY.DARK_GREY,
    minHeight: RFValue(100),
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  allDetailsCtr: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCtr: {flex: 1},
  childCtr: {
    flexDirection: 'column',
    paddingHorizontal: 20,
    flex: 5,
  },
  buttonTextCtr: {
    borderRadius: SIZES.rounding3,
    justifyContent: 'center',
    backgroundColor: COLORS.PRIMARY.LIGHT_PURPLE,
    minWidth: 85,
    minHeight: 35,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: SIZES.fontBold0,
    color: COLORS.PRIMARY.PURPLE,
    fontSize: SIZES.font10,
    fontFamily: FONT_FAMILY.REGULAR,
  },
  detailsCtr: {flexDirection: 'column'},
  upperCtr: {flexDirection: 'row', justifyContent: 'space-between'},
  descTextCtr: {
    maxWidth: 150,
  },
  buttonCtr: {},
  lineCtr: {
    ...SPACING.mt2,
  },
  titleText: {
    fontSize: SIZES.fontH6,
    fontWeight: '800',
    fontFamily: FONT_FAMILY.EXTRA_BOLD,
    color: 'black',
  },
  descriptionText: {
    color: COLORS.SECONDARY.GREY,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.REGULAR,
  },
  lines: {
    flexDirection: 'row',
  },
  linePurple: {
    borderWidth: 2,
    flex: 1,
    borderColor: COLORS.PRIMARY.PURPLE,
  },
  lineRed: {
    borderWidth: 2,
    flex: 1,
    borderColor: COLORS.SECONDARY.RED,
  },
  lineOrange: {
    borderWidth: 2,
    flex: 1,
    borderColor: COLORS.SECONDARY.ORANGE,
  },
  marker: {
    position: 'absolute',
    height: 14,
    width: 2.5,
    top: -5,
    left: '0%',
    backgroundColor: 'black',
    borderRadius: 200,
  },
});
