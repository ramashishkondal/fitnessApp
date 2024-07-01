import {COLORS, FONT_FAMILY} from '../../../Constants/commonStyles';
import {StyleSheet} from 'react-native';
import {SIZES} from '../../../Constants';

export const styles = StyleSheet.create({
  parent: {
    maxWidth: '100%',
    flex: 1,
  },
  titleText: {
    fontSize: SIZES.font19,
    marginHorizontal: 16,
    textAlign: 'left',
  },
  image: {
    height: SIZES.height / 3,
    marginHorizontal: 16,
    marginVertical: 32,
    borderRadius: SIZES.rounding2,
  },
  captionText: {marginTop: 8, fontSize: SIZES.font13, marginHorizontal: 16},
  textInput: {
    marginHorizontal: 8,
    fontFamily: FONT_FAMILY.REGULAR,
    color: 'black',
  },
  footerCtr: {
    backgroundColor: COLORS.SECONDARY.WHITE,
    position: 'absolute',
    bottom: 1,
    flexWrap: 'wrap',
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
  addPostCtr: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginVertical: 16,
    alignItems: 'center',
  },
  customImageParent: {
    width: 50,
    height: 50,
  },
  customImage: {
    borderRadius: 200,
  },
  textInputCtr: {
    flexGrow: 1,
  },
});
