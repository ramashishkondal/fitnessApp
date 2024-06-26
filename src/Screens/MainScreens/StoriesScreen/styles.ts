import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../../Constants';

export const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY.LIGHT_GREY,
  },
  gestureRecognizer: {
    flex: 1,
  },
  touchablesCtr: {
    height: SIZES.height,
    width: SIZES.width,
    position: 'absolute',
    flexDirection: 'row',
    zIndex: 1,
  },
  leftPressable: {
    height: SIZES.height,
    width: SIZES.width / 2,
  },
  rightPressable: {
    height: SIZES.height,
    width: SIZES.width / 2,
  },
  videoCtr: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  customLoading: {
    position: 'absolute',
    alignSelf: 'center',
  },
  video: {
    minWidth: SIZES.width,
    minHeight: SIZES.height,
  },
  customImage: {
    minWidth: SIZES.width,
    minHeight: SIZES.height,
  },
});
