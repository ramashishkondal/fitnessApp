import {StyleSheet} from 'react-native';
import {COLORS, SIZES, SPACING} from '../../../Constants';
import {FONT_FAMILY} from '../../../Constants/commonStyles';

export const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY.GREY,
    alignItems: 'center',
  },
  photo: {
    height: 90,
    width: 90,
    borderRadius: 200,
    marginTop: 9,
    marginBottom: 32,
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
    flex: 0.4,
    alignItems: 'center',
  },
  photoCtr: {
    alignItems: 'flex-end',
  },
  closeCtr: {
    position: 'absolute',
    flex: 1,
    zIndex: 2,
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
  fullScreenPhotoCtr: {
    position: 'absolute',
    backgroundColor: COLORS.PRIMARY.GREY,
    width: '100%',
    height: '100%',
    padding: 8,
    alignItems: 'center',
    zIndex: 2,
  },
  openFullScreenCtr: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    position: 'absolute',
    height: 90,
    width: 90,
    borderRadius: 200,
    marginTop: 9,
    marginBottom: 32,
    zIndex: 1,
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
});
