import {StyleSheet} from 'react-native';
import {COLORS, SIZES, SPACING} from '../../../Constants';
import {RFValue} from 'react-native-responsive-fontsize';
import {FONT_FAMILY} from '../../../Constants/commonStyles';

export const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY.GREY,
    alignItems: 'center',
  },
  photo: {
    height: RFValue(65),
    width: RFValue(65),
    borderRadius: 200,
    marginTop: 9,
    marginBottom: 38,
  },
  titleText: {
    fontSize: SIZES.fontH5,
    fontWeight: SIZES.fontBold1,
    textAlign: 'center',
    ...SPACING.mh2,
  },
  titleDescriptionText: {
    ...SPACING.mt1,
    paddingHorizontal: 25,
    ...SPACING.mh2,
  },
  buttonParentStyle: {
    marginTop: 72,
  },
  addPhotoText: {
    color: COLORS.PRIMARY.PURPLE,
    fontSize: SIZES.fontH7,
    fontWeight: SIZES.fontBold0,
    fontFamily: FONT_FAMILY.REGULAR,
    ...SPACING.mt2,
    ...SPACING.mh2,
  },
  avatarCtr: {
    height: SIZES.height / 7,
    alignItems: 'center',
  },
  photoCtr: {
    alignItems: 'flex-end',
  },
  closeCtr: {
    position: 'absolute',
    flex: 1,
  },
  closeIconCtr: {
    backgroundColor: 'grey',
    borderRadius: 200,
    right: 4,
    top: 6,
  },
  childCtr: {
    marginTop: 32,
    alignItems: 'center',
  },
});
