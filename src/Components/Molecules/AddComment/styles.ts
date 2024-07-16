import {COLORS, FONT_FAMILY} from '../../../Constants/commonStyles';
import {StyleSheet} from 'react-native';
import {SIZES} from '../../../Constants';

export const styles = StyleSheet.create({
  parent: {
    maxWidth: '100%',
    flex: 1,
    justifyContent: 'space-between',
  },
  addCommentCtr: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginVertical: 32,
    // alignItems:
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
    minWidth: 200,
    alignSelf: 'center',
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
    backgroundColor: 'white',
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
  EmojiSelectorCtr: {
    height: 300,
    bottom: 100,
    alignItems: 'flex-end',
    marginHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: SIZES.rounding0,
    elevation: 8,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: -300},
    shadowRadius: 300,
  },
});
