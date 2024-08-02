import {COLORS, FONT_FAMILY} from '../../../Constants/commonStyles';
import {StyleSheet} from 'react-native';
import {SIZES} from '../../../Constants';

export const styles = StyleSheet.create({
  parent: {
    maxWidth: '100%',
    flex: 1,
  },

  parentPressable: {
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
    marginVertical: 16,
    borderRadius: SIZES.rounding2,
  },
  captionText: {marginTop: 8, fontSize: SIZES.font13, marginHorizontal: 16},
  textInput: {
    marginHorizontal: 8,
    fontFamily: FONT_FAMILY.REGULAR,
    color: 'black',
    minWidth: 140,
    maxWidth: 240,
    // alignSelf: 'center',
  },
  footerCtr: {
    backgroundColor: COLORS.SECONDARY.WHITE,
    position: 'relative',
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
    // alignItems: 'center',
  },
  customImageParent: {
    width: 50,
    height: 50,
  },
  customImage: {
    borderRadius: 200,
  },
  textInputCtr: {
    // flexGrow: 1,
    justifyContent: 'center',
  },
  EmojiSelectorCtr: {
    height: 300,
    alignItems: 'flex-end',
    marginHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: SIZES.rounding0,
    elevation: 8,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: -300},
    shadowRadius: 300,
    // borderWidth: 1,
  },
  customButtonCtr: {
    flexGrow: 1,
    alignItems: 'flex-end',
  },
});
