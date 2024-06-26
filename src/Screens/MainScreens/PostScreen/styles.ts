import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../../Constants';

export const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: COLORS.SECONDARY.WHITE,
  },
  commentsCtr: {
    flex: 2,
    paddingBottom: SIZES.height / 10,
    paddingHorizontal: 24,
  },
  bottomTextInputCtr: {
    position: 'absolute',
    bottom: 0,
    borderWidth: 1,
    flex: 1,
    height: SIZES.height / 14,
    width: SIZES.width,
    backgroundColor: COLORS.SECONDARY.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 6,
    paddingHorizontal: 24,
    fontSize: SIZES.font12,
  },
  sendCtr: {
    flex: 1,
  },
  userPostCtr: {
    flex: 3,
  },
});
