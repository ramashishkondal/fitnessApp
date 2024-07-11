import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../../Constants';
import {FONT_FAMILY} from '../../../Constants/commonStyles';

export const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: COLORS.SECONDARY.WHITE,
    borderRadius: SIZES.rounding2,
    padding: 20,
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  userInfoCtr: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  likesAndCommentsCtr: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 16,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userTextCtr: {
    marginHorizontal: 10,
  },
  userPhoto: {
    width: 50,
    height: 50,
    borderRadius: 200,
  },
  photo: {
    height: 300,
    flex: 1,
  },
  likesText: {
    marginHorizontal: 8,
    color: COLORS.SECONDARY.GREY,
    fontWeight: SIZES.fontBold0,
    fontSize: SIZES.font12,
    fontFamily: FONT_FAMILY.REGULAR,
  },
  captionText: {
    marginVertical: 16,
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: SIZES.font12,
    color: 'black',
  },
  userNameText: {
    fontFamily: FONT_FAMILY.BOLD,
    fontSize: SIZES.font13,
    color: 'black',
  },
  likeCtr: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  commentLogoCtr: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  commentCtr: {
    flex: 4.5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  descriptionText: {
    fontSize: SIZES.font10,
    textAlign: 'left',
  },
  noCaptionCtr: {
    marginVertical: 8,
  },
});
