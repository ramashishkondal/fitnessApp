import {COLORS, FONT_FAMILY} from '../../../Constants/commonStyles';
import {StyleSheet} from 'react-native';
import {SIZES} from '../../../Constants';

export const styles = StyleSheet.create({
  parent: {
    maxWidth: '100%',
    flex: 1,
  },
  addCommentCtr: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginVertical: 32,
    alignItems: 'center',
  },
  customImageParent: {
    width: 50,
    height: 50,
  },
  customImage: {
    borderRadius: 200,
  },
  titleText: {
    fontSize: SIZES.font19,
    marginHorizontal: 16,
    textAlign: 'left',
  },
  image: {
    height: SIZES.height / 2,
    width: '100%',
    borderRadius: SIZES.rounding2,
  },
  captionText: {marginTop: 8, fontSize: SIZES.font13},
  textInput: {
    marginHorizontal: 8,
    fontFamily: FONT_FAMILY.REGULAR,
    // flexGrow: 1,
    color: 'black',
    maxWidth: 240,
  },
  footerCtr: {
    position: 'absolute',
    bottom: 1,
    flexGrow: 1,
    flexDirection: 'row',
    borderTopWidth: 1,
    marginHorizontal: 16,
    borderColor: COLORS.SECONDARY.GREY,
    padding: 10,
    paddingVertical: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 40,
  },
  childFooterCtr: {flexDirection: 'row'},
  iconsCtr: {marginHorizontal: 8},
  buttonParentStyle: {
    maxWidth: SIZES.width / 4,
    maxHeight: SIZES.height / 22,
  },
  customButtonCtr: {
    flexGrow: 1,
    alignItems: 'flex-end',
  },
});
