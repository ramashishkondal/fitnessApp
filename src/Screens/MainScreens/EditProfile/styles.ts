import {StyleSheet} from 'react-native';
import {COLORS} from '../../../Constants';
import {FONT_FAMILY, SIZES} from '../../../Constants/commonStyles';
import {RFValue} from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY.LIGHT_GREY,
  },
  infoTextHeading: {
    marginBottom: 3,
    color: 'black',
    fontFamily: FONT_FAMILY.REGULAR,
    fontWeight: 700,
  },
  infoText: {
    marginBottom: 3,
    color: COLORS.PRIMARY.PURPLE,
    fontFamily: FONT_FAMILY.REGULAR,
    fontWeight: 700,
  },
  cardsHeadingText: {
    marginTop: 16,
    marginHorizontal: 32,
    marginBottom: 8,
    color: COLORS.SECONDARY.GREY,
    fontFamily: FONT_FAMILY.MEDIUM,
    fontSize: RFValue(12),
  },
  userInfoCtr: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 16,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: SIZES.rounding2,
    paddingHorizontal: 8,
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
  pencilBackCtr: {
    backgroundColor: 'grey',
    borderRadius: 200,
    padding: 8,
  },
  pencilCtr: {
    position: 'absolute',
    right: 8,
    bottom: 8,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    borderRadius: 200,
  },
  cardCtr: {
    backgroundColor: COLORS.SECONDARY.WHITE,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: SIZES.rounding2,
  },
});
