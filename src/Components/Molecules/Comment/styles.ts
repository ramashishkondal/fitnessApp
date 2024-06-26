import {StyleSheet} from 'react-native';
import {SIZES} from '../../../Constants';
import {FONT_FAMILY} from '../../../Constants/commonStyles';

export const styles = StyleSheet.create({
  parent: {
    flex: 1,
    paddingVertical: 16,
  },
  userInfoCtr: {
    flexDirection: 'row',
    marginTop: 10,
  },
  userPhoto: {
    width: 50,
    height: 50,
    borderRadius: 200,
  },
  userTextCtr: {
    marginHorizontal: 10,
  },
  userNameText: {
    fontSize: SIZES.font13,
    fontWeight: SIZES.fontBold0,
    fontFamily: FONT_FAMILY.REGULAR,
    color: 'black',
  },
  commentText: {
    fontSize: SIZES.font12,
    marginTop: 20,
    fontFamily: FONT_FAMILY.REGULAR,
    color: 'black',
  },
  descriptionText: {
    fontSize: SIZES.font11,
    textAlign: 'left',
  },
  customImageCtr: {
    alignItems: 'center',
  },
});
