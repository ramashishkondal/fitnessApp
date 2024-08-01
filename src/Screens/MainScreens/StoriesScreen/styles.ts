import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../../Constants';
import {FONT_FAMILY} from '../../../Constants/commonStyles';

export const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY.LIGHT_GREY,
  },
  gestureRecognizer: {
    flex: 1,
  },
  topInfoCtr: {
    position: 'absolute',
    width: '100%',
    zIndex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  topCurrentStoryLineCtr: {
    flexDirection: 'row',
    marginTop: 8,
  },
  dots: {
    width: 6,
    height: 6,
    backgroundColor: COLORS.SECONDARY.WHITE,
    borderRadius: 200,
    marginRight: 24,
    marginTop: 2,
  },
  line: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 0.25,
    borderColor: 'black',
    marginHorizontal: 4,
    height: 4,
    borderRadius: 200,
  },
  lineActive: {
    backgroundColor: COLORS.PRIMARY.PURPLE,
  },
  userInfoCtr: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
  },
  userImage: {
    borderRadius: 200,
    borderWidth: 1.0,
    borderColor: 'white',
  },
  customImageCtr: {
    flex: 0.15,
  },
  userNameText: {
    color: 'white',
    fontFamily: FONT_FAMILY.BOLD,
    fontSize: SIZES.font13,
    textShadowColor: '#585858',
    textShadowRadius: 10,
    shadowOpacity: 0.5,
  },
  userNameCtr: {
    flex: 0.85,
  },
  customImageParent: {
    width: 45,
    height: 45,
    shadowColor: '#585858',
    shadowRadius: 10,
    shadowOpacity: 0.5,
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
    flex: 1,
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
