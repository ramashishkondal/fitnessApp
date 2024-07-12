import {StyleSheet} from 'react-native';
import {COLORS} from '../../../Constants';
import {FONT_FAMILY, SIZES} from '../../../Constants/commonStyles';

export const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY.LIGHT_GREY,
  },
  editText: {
    color: '#348AFE',
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    fontSize: SIZES.font15,
    fontWeight: '500',
  },
  editCtr: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginRight: 8,
  },
  infoTextHeading: {
    marginBottom: 3,
    color: 'black',
    fontFamily: FONT_FAMILY.REGULAR,
    fontWeight: '700',
    fontSize: SIZES.font12,
  },
  infoText: {
    marginBottom: 3,
    color: COLORS.PRIMARY.PURPLE,
    fontFamily: FONT_FAMILY.REGULAR,
    fontWeight: '700',
    fontSize: SIZES.font12,
  },
  cardsHeadingText: {
    marginTop: 16,
    marginHorizontal: 32,
    marginBottom: 8,
    color: COLORS.SECONDARY.GREY,
    fontFamily: FONT_FAMILY.MEDIUM,
    fontSize: SIZES.fontH7,
    // fontSize: RFValue(12),
  },
  nameAndGenderCtr: {
    flex: 1,
  },
  firstNameAndLastNameCtr: {
    flex: 2,
  },
  otherCtr: {
    flex: 5,
  },
  userInfoCtr: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 8,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: SIZES.rounding2,
    paddingHorizontal: 8,
    paddingVertical: 24,
    justifyContent: 'space-evenly',
  },
  userPhotoCtr: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userPhotoParent: {width: 80, height: 80},
  userPhoto: {borderRadius: 200},
  pencilPhotoCtr: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.1)',
    width: 80,
    height: 80,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    borderRadius: 200,
  },
  pencilBackPhotoCtr: {
    backgroundColor: 'grey',
    borderRadius: 200,
    padding: 8,
  },
  pencilBackCtr: {
    backgroundColor: 'grey',
    borderRadius: 200,
    padding: 8,
    marginRight: 16,
  },
  pencilCtr: {
    position: 'absolute',
    right: 8,
    top: 8,
    // bottom: 8,
    // alignItems: 'flex-end',
    // justifyContent: 'flex-end',
    borderRadius: 200,
  },
  cardCtr: {
    backgroundColor: COLORS.SECONDARY.WHITE,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: SIZES.rounding2,
    paddingVertical: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 16,
    rowGap: 16,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  genderCtr: {
    flex: 2,
    flexDirection: 'row',
  },
  withModalParent: {
    backgroundColor: COLORS.PRIMARY.LIGHT_GREY,
  },
});
